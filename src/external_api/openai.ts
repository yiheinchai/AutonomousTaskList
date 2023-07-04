import { OpenAIStreamPayload, tOpenaiMessage } from "@/app/dashboard/task/lib/types";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

export const OPENAI_MODEL = "gpt-3.5-turbo";

export async function call_gpt(message: string, stream: boolean = false) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${process.env["OPENAI_API_KEY"]}`);

  console.log("calling gpt function...");
  const raw = JSON.stringify({
    model: OPENAI_MODEL,
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    n: 1,
    stream,
    max_tokens: 4000,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
  const result = await response.json();

  return result.choices[0].message.content;
}

export async function OpenAIStream(payload: OpenAIStreamPayload) {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const requestHeaders = new Headers();
  requestHeaders.append("Content-Type", "application/json");
  requestHeaders.append("Accept", "application/json");
  requestHeaders.append("Authorization", `Bearer ${process.env["OPENAI_API_KEY"]}`);

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    headers: requestHeaders,
    method: "POST",
    body: JSON.stringify(payload),
  });

  const readableStream = new ReadableStream({
    async start(controller) {
      // callback
      const onParse = (event: ParsedEvent | ReconnectInterval) => {
        if (event.type === "event") {
          const data = event.data;
          controller.enqueue(encoder.encode(data));
        }
      };

      // optimistic error handling
      if (res.status !== 200) {
        const data = {
          status: res.status,
          statusText: res.statusText,
          body: await res.text(),
        };
        console.log(`Error: recieved non-200 status code, ${JSON.stringify(data)}`);
        controller.close();
        return;
      }

      // stream response (SSE) from OpenAI may be fragmented into multiple chunks
      // this ensures we properly read chunks and invoke an event for each SSE event stream
      const parser = createParser(onParse);
      // https://web.dev/streams/#asynchronous-iteration
      for await (const chunk of res.body as any) {
        parser.feed(decoder.decode(chunk));
      }
    },
  });

  let counter = 0;
  const transformStream = new TransformStream({
    async transform(chunk, controller) {
      const data = decoder.decode(chunk);
      // https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
      if (data === "[DONE]") {
        controller.terminate();
        return;
      }
      try {
        const json = JSON.parse(data);
        const text = json.choices[0].delta?.content || "";
        if (counter < 2 && (text.match(/\n/) || []).length) {
          // this is a prefix character (i.e., "\n\n"), do nothing
          return;
        }
        // stream transformed JSON resposne as SSE
        const payload = { text: text };
        // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#event_stream_format
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(payload)}\n\n`));
        counter++;
      } catch (e) {
        // maybe parse error
        controller.error(e);
      }
    },
  });

  return readableStream.pipeThrough(transformStream);
}

export async function call_gpt_with_stream(
  message: string,
  message_history: tOpenaiMessage[] = []
) {
  const payload: OpenAIStreamPayload = {
    model: OPENAI_MODEL,
    messages: [
      ...message_history,
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    n: 1,
    stream: true,
    max_tokens: 4000,
    presence_penalty: 0,
    frequency_penalty: 0,
  };

  return OpenAIStream(payload);
}
async function execute() {
  const response = await fetch("/api/tasks/execute", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // This data is a ReadableStream
  const data = response.body;

  if (!data) {
    throw new Error("No data");
  }

  const onParse = (event: any) => {
    if (event.type === "event") {
      const data = event.data;
      try {
        const text = JSON.parse(data).text ?? "";
        console.log("generated text:", text);
      } catch (e) {
        console.error(e);
      }
    }
  };

  // https://web.dev/streams/#the-getreader-and-read-methods
  const reader = data.getReader();
  const decoder = new TextDecoder();
  const parser = createParser(onParse);
  let done = false;
  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);
    parser.feed(chunkValue);
  }
}
