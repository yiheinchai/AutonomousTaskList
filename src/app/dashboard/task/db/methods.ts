import { addDbSubtask, addManyDbTask, getDbTasks } from "@/utils/database";
import { convertDbTaskToTask } from "../utils/utils";
import { add } from "date-fns";
import { tTask } from "../lib/types";
import { call_gpt } from "@/external_api/openai";

export async function getTasks() {
  const tasks = await getDbTasks();
  const hierarchicalTasks = convertDbTaskToTask(tasks);
  return hierarchicalTasks;
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

export async function generateGPTSubtasks(task: tTask) {
  const response = await call_gpt(task.name + " What are the steps that needs to be taken?");
  const subtasks = extractListItems(response);
  const createdSubtasks = addManyDbTask(task.id, subtasks);

  return createdSubtasks;
}
