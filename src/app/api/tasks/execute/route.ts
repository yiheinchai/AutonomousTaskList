import { call_gpt_with_stream } from "@/external_api/openai";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  // const reqBody: tTask = await req.json();

  // const updatedTask = await executeGPTTask(reqBody, true);

  const stream = await call_gpt_with_stream("Give me a tutorial on NextJS");

  return new Response(stream, {
    headers: new Headers({
      // since we don't use browser's EventSource interface, specifying content-type is optional.
      // the eventsource-parser library can handle the stream response as SSE, as long as the data format complies with SSE:
      // https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#sending_events_from_the_server

      // 'Content-Type': 'text/event-stream',
      "Cache-Control": "no-cache",
    }),
  });
}
