import { getDbTasks } from "@/utils/database";
import { convertDbTaskToTask } from "../utils/utils";

export async function getTasks() {
  const tasks = await getDbTasks();
  const hierarchicalTasks = convertDbTaskToTask(tasks);
  return hierarchicalTasks;
}
