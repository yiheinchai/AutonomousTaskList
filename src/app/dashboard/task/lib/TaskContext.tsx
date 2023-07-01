"use client";

import { createContext, useEffect, useState } from "react";
import { getTasks } from "../db/methods";
import { tTask } from "./types";

interface tTaskContext {
  tasks: tTask[];
  setTasks: (tasks: tTask[]) => void;
}

export const TaskContext = createContext<tTaskContext>({
  tasks: [],
  setTasks: () => {},
});

export default function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<tTask[]>([]);

  useEffect(() => {
    async function initTasks() {
      const tasks = await getTasks();
      setTasks(tasks);
    }
    initTasks();
  }, []);

  const taskContextValue = {
    tasks,
    setTasks,
  };

  return <TaskContext.Provider value={taskContextValue}>{children}</TaskContext.Provider>;
}
