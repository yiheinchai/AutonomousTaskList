import { PrismaClient } from "@prisma/client";
import { HierarchicalTask } from "./utils";

async function call_gpt(message: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer `);

  const raw = JSON.stringify({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "user",
        content: message,
      },
    ],
    temperature: 0.7,
    top_p: 1,
    n: 1,
    stream: false,
    max_tokens: 4000,
    presence_penalty: 0,
    frequency_penalty: 0,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };
  const response = await fetch("https://api.openai.com/v1/chat/completions", requestOptions);
  const result = await response.json();

  return result.choices[0].message.content;
}

function extractListItems(text: string) {
  const pattern = /\d+\.\s+(.*)/g;
  const matches = text.match(pattern);

  if (matches) {
    const items = matches.map((match) => match.replace(/\d+\.\s+/, ""));
    return items;
  }

  return [];
}

export async function generateSubtasks(task: string) {
  const response = await call_gpt(task + " What are the steps that needs to be taken?");
  const subtasks = extractListItems(response);
  return subtasks;
}
