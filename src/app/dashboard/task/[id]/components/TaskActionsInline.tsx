"use client";

import ButtonGroup from "@/app/components/ButtonGroup";
import FormButton from "@/app/components/FormButton";
import FormButtonInput from "@/app/components/FormButtonInput";
import { tTask } from "../../lib/types";
import Button from "@/app/components/Button";
import { useState } from "react";
import { createParser, ParsedEvent, ReconnectInterval } from "eventsource-parser";

export default function TaskActionsInline({ task }: { task: tTask }) {
  const [executionResult, setExecutionResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDelete = async (formData: FormData) => {};

  const handleUpdate = async (formData: FormData) => {};

  const handleAdd = async (formData: FormData) => {};

  const handleAutoAdd = async () => {};

  const handleExecute = async (e: any) => {
    e.preventDefault();
    setExecutionResult("");
    setLoading(true);
    const response = await fetch("/api/completion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: `Task: ${task.name}` }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    // This data is a ReadableStream
    const data = response.body;
    if (!data) {
      return;
    }

    const onParse = async (event: ParsedEvent | ReconnectInterval) => {
      if (event.type === "event") {
        const data = event.data;
        try {
          const text = JSON.parse(data).text ?? "";
          setExecutionResult((prev) => prev + text);
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
    setLoading(false);
  };

  return (
    <>
      <ButtonGroup>
        <FormButtonInput
          action={handleAdd}
          inputFields={[
            {
              name: "name",
              placeholder: "Enter new task name",
              "aria-label": "Enter new task name",
            },
          ]}
          metadata={{ parentId: task.id }}
        >
          Add
        </FormButtonInput>
        <FormButton action={handleAutoAdd}>Auto add</FormButton>
        <FormButtonInput
          action={handleUpdate}
          inputFields={[
            {
              name: "name",
              placeholder: "Enter new task name",
              "aria-label": "Enter new task name",
              defaultValue: task.name,
            },
          ]}
          metadata={{ taskId: task.id }}
        >
          Edit
        </FormButtonInput>
        <Button onClick={handleExecute}>Execute</Button>
        <FormButton metadata={{ taskId: task.id }} action={handleDelete}>
          Delete
        </FormButton>
      </ButtonGroup>
      <div className="p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">{executionResult}</div>
      </div>
    </>
  );
}
