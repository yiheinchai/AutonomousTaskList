export interface Task {
  id: number;
  name: string;
  parentId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface HierarchicalTask {
  id: number;
  name: string;
  subtasks: HierarchicalTask[];
  createdAt: Date;
  updatedAt: Date;
}

export function convertToHierarchical(tasks: Task[]): HierarchicalTask[] {
  const taskMap: Record<number, HierarchicalTask> = {};
  const rootTasks: HierarchicalTask[] = [];

  // Create a map of tasks using their IDs as keys
  tasks.forEach((task) => {
    taskMap[task.id] = {
      name: task.name,
      id: task.id,
      subtasks: [],
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
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
