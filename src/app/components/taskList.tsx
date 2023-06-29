import { NextUIProvider } from "@nextui-org/react";
import Task from "./task";
import { Container, Row, Col } from "@nextui-org/react";
import { HierarchicalTask } from "../utils/utils";

export default function TaskList({ tasks }: { tasks: HierarchicalTask[] }) {
  return (
    <NextUIProvider>
      <div className="flex-col gap-2 flex">
        {tasks.map((task) => {
          if (!task.id) return null;
          return <Task key={task.id} task={task} />;
        })}
      </div>
    </NextUIProvider>
  );
}
