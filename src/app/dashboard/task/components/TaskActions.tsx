import FlexEnd from "@/app/components/FlexEnd";
import { tDbTask, tTask } from "../lib/types";
import ButtonGroup from "@/app/components/ButtonGroup";
import Button from "@/app/components/Button";
import { addDbSubtask } from "@/utils/database";
import { cookies } from "next/headers";
import ButtonNewTask from "./ButtonNewTask";
import FormNewTask from "./FormNewTask";

export default function TaskActions({ task }: { task: tTask }) {
  return (
    <FlexEnd>
      <ButtonGroup>
        {/* <Button
          onClick={async () => {
            const taskName = prompt("Enter the name of task", "Task name") || "New task";
            addDbSubtask(task.id, taskName);
            const taskName = prompt("Enter the name of task", "Task name");
            const res = await fetch("/dashboard/task/api/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name: taskName, parentId: task.id }),
            });
            const data: tDbTask = await res.json();
          }}
        >
          Add
        </Button> */}
        <ButtonNewTask newTaskForm={<FormNewTask parentId={task.id}/>}>Add</ButtonNewTask>
        <Button>Auto add</Button>
        <Button>Edit</Button>
        <Button>Delete</Button>
      </ButtonGroup>
    </FlexEnd>
  );
}
