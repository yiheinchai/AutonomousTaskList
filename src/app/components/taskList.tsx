"use client";
import { NextUIProvider } from "@nextui-org/react";
import Task from "./task";
import { Container, Row, Col } from "@nextui-org/react";

export type TaskType = {
  id: number;
  name: string;
  parentId: number;
  createdAt: Date;
  updatedAt: Date;
};

export default function TaskList({ tasks }: { tasks: TaskType[] }) {
  console.log(tasks);
  return (
    <NextUIProvider>
      <div className="flex-col gap-2 flex">
        {tasks.map((task) => (
          <Task key={task.id} name={task.name} />
        ))}
      </div>
    </NextUIProvider>
  );
}
