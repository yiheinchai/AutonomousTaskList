import { tTask } from "../lib/types";
import ButtonGroup from "@/app/components/ButtonGroup";
import { addDbSubtask, deleteDbTask, updateDbTask } from "@/utils/database";
import FormButton from "@/app/components/FormButton";
import FormButtonInput from "@/app/components/FormButtonInput";
import { executeGPTTask, generateGPTSubtasks } from "../db/methods";

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

    await updateDbTask({ id: taskId, name: edittedTaskName });
  };

  const handleAdd = async (formData: FormData) => {
    "use server";
    const taskName = String(formData.get("name"));
    const parentId = Number(formData.get("parentId"));

    if (!taskName || !parentId) return;
    await addDbSubtask(parentId, taskName);
  };

  const handleAutoAdd = async () => {
    "use server";
    console.log("activating autoadd");
    await generateGPTSubtasks(task);
  };

  const handleExecute = async () => {
    "use server";
    await executeGPTTask(task);
  };

  return (
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
      <FormButton action={handleAutoAdd}>Auto add</FormButton>
      <FormButtonInput
        action={handleUpdate}
        inputFields={[
          {
            name: "name",
            placeholder: "Enter new task name",
            ariaLabel: "Enter new task name",
            defaultValue: task.name,
          },
        ]}
        metadata={{ taskId: task.id }}
      >
        Edit
      </FormButtonInput>
      <FormButton action={handleExecute}>Execute</FormButton>
      <FormButton metadata={{ taskId: task.id }} action={handleDelete}>
        Delete
      </FormButton>
    </ButtonGroup>
  );
}
