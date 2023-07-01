import TaskList from "./components/TaskList";
import { getTasks } from "./db/methods";

export default async function Page() {
  const tasks = await getTasks();
  return (
    <div className="m-3">
      <TaskList withHeader tasks={tasks} />
    </div>
  );
}
