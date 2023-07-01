import Button from "@/app/components/Button";
import FormNewTask from "./FormNewTask";

export default function ButtonNewTask({
  children,
  newTaskForm,
}: {
  children: React.ReactNode;
  newTaskForm: React.ReactNode;
}) {
  return (
    <div className="group overflow-visible">
      <Button>{children}</Button>
      {newTaskForm}
    </div>
  );
}
