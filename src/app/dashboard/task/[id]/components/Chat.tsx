"use client";

import { useState } from "react";
import { tOpenaiMessage, tTask } from "../../lib/types";
import ChatBubbleSystem from "./ChatBubbleSystem";
import ChatBubbleUser from "./ChatBubbleUser";
import ChatFooter from "./ChatFooter";
import { ParsedEvent, ReconnectInterval, createParser } from "eventsource-parser";

export default function Chat({ task }: { task: tTask }) {
  const [aiOutput, setAIOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<tOpenaiMessage[]>(task.chat_history || []);

  async function getCompletion(message: string) {
    console.log("activating completion", message);
    setLoading(true);
    // setAIOutput("");
    // setChatHistory([{ role: "user", content: message } as tOpenaiMessage]);
    setChatHistory((prev: tOpenaiMessage[]) => [
      ...prev,
      { role: "user", content: message } as tOpenaiMessage,
      { role: "system", content: "" } as tOpenaiMessage,
    ]);
    const response = await fetch("/api/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: message }),
    });
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }
    const onParse = (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === "event") {
        const data = event.data;
        try {
          const text: string = JSON.parse(data).text ?? "";
          setChatHistory((prev: tOpenaiMessage[]) => {
            const prevMessages = prev.slice(0, -1);
            const lastMessage = prev.at(-1);
            if (lastMessage == null) return prev;
            const updatedLastMessage = { ...lastMessage, content: lastMessage.content + text };
            return [...prevMessages, updatedLastMessage];
          });
          console.log(text, loading);
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

  return (
    <>
      <div className="mt-4 p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
        <h2 className="text-base font-medium text-gray-800 dark:text-white">Activity</h2>
        <ul className="mt-4 space-y-5">
          {chatHistory.map((chat, index) => {
            if (chat.role === "system") {
              return <ChatBubbleSystem key={index} content={chat.content} />;
            }

            if (chat.role === "user") {
              return <ChatBubbleUser key={index} content={chat.content} />;
            }
          })}
        </ul>
      </div>
      <ChatFooter sendMessage={(message: string) => getCompletion(message)} />
    </>
  );
}
