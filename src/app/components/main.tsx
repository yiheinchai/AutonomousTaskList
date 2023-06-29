"use client";
import { NextUIProvider } from "@nextui-org/react";
import TaskList from "./taskList";
import { HierarchicalTask } from "../utils/utils";

type Props = {
  tasks: HierarchicalTask[];
};

function Main(props: Props) {
  return (
    <NextUIProvider>
      <div className="w-full p-4">
        <h2>TaskList</h2>
        <TaskList tasks={props.tasks} />
      </div>
    </NextUIProvider>
  );
}

export default Main;
