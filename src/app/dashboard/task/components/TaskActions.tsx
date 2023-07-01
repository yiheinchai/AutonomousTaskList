import FlexEnd from "@/app/components/FlexEnd";
import { tDbTask, tTask } from "../lib/types";
import ButtonGroup from "@/app/components/ButtonGroup";
import Button from "@/app/components/Button";
import { addDbSubtask, deleteDbTask, updateDbTask } from "@/utils/database";
import { cookies } from "next/headers";
import ButtonNewTask from "./ButtonNewTask";
import FormNewTask from "./FormNewTask";
import FormButton from "@/app/components/FormButton";
import FormButtonInput from "@/app/components/FormButtonInput";

export default function TaskActions({ task }: { task: tTask }) {
  const handleDelete = async (formData: FormData) => {
    "use server";
    const taskId = Number(formData.get("taskId"));
    if (!taskId) return;
    await deleteDbTask(taskId);
  };

  const handleUpdate = async (formData: FormData) => {
    "use server";
    const taskId = Number(formData.get("taskId"));
    const edittedTaskName = String(formData.get("name"));

    if (!taskId || !edittedTaskName) return;

    await updateDbTask(taskId, edittedTaskName);
  };

  const handleAdd = async (formData: FormData) => {
    "use server";
    const taskName = String(formData.get("name"));
    const parentId = Number(formData.get("parentId"));

    if (!taskName || !parentId) return;
    await addDbSubtask(parentId, taskName);
  };

  return (
    <FlexEnd>
      <ButtonGroup>
        <FormButtonInput
          action={handleAdd}
          inputFields={[
            { name: "name", placeholder: "Enter new task name", ariaLabel: "Enter new task name" },
          ]}
          metadata={{ parentId: task.id }}
        >
          Add
        </FormButtonInput>
        <Button>Auto add</Button>
        <FormButtonInput
          action={handleUpdate}
          inputFields={[
            { name: "name", placeholder: "Enter new task name", ariaLabel: "Enter new task name" },
          ]}
          metadata={{ taskId: task.id }}
        >
          Edit
        </FormButtonInput>
        <FormButton metadata={{ taskId: task.id }} action={handleDelete}>
          Delete
        </FormButton>
      </ButtonGroup>
    </FlexEnd>
  );
}
