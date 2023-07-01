import { tDbTask, tTask } from "../lib/types";

export function convertDbTaskToTask(tasks: tDbTask[]): tTask[] {
  const taskMap: Record<string, tTask> = {};
  const rootTasks: tTask[] = [];

  // Create a map of tasks using their IDs as keys
  tasks.forEach((task) => {
    taskMap[task.id] = {
      name: task.name,
      id: task.id,
      parentId: task.parentId,
      assignee: task.assignee,
      status: task.status,
      subtasks: [],
      description: task.description,
      chat_history: task.chat_history,
      execution_result: task.execution_result,
    };
  });

  // Build the hierarchical structure by assigning subtasks to their parent tasks
  tasks.forEach((task) => {
    const currentTask = taskMap[task.id];
    const parentTask = taskMap[task.parentId || 0]; // Use 0 if parentId is null

    if (parentTask) {
      parentTask.subtasks.push(currentTask);
    } else {
      rootTasks.push(currentTask); // If parentTask doesn't exist, it is a root task
    }
  });

  return rootTasks;
}

export function convertTaskToDbTask(task: tTask, parentId: string): tDbTask[] {
  const dbTask: tDbTask = {
    name: task.name,
    id: task.id,
    assignee: task.assignee,
    status: task.status,
    parentId: parentId, // Set parentId initially to null
    description: task.description,
    chat_history: task.chat_history,
    execution_result: task.execution_result,
  };

  let subtasks: tDbTask[] = [];
  if (task.subtasks && task.subtasks.length > 0) {
    console.log("has subtasks");
    // If the task has subtasks, recursively convert them to dbTasks
    task.subtasks.forEach((subtask) => {
      const dbSubtasks = convertTaskToDbTask(subtask, task.id);
      subtasks = [...subtasks, ...dbSubtasks];
    });
  }

  return [dbTask, ...subtasks];
}
