import { getTask, getTasks } from "../db/methods";
import Chip from "@/app/components/Chip";
import { STATUS_COLORS } from "../lib/consts";
import TaskActionsInline from "./components/TaskActionsInline";
import Chat from "./components/Chat";
import TaskList from "../components/TaskList";

export async function generateStaticParams() {
  const tasks = await getTasks();

  return tasks.map((task) => ({
    id: task.id,
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const task = await getTask(params.id);
  return (
    <div className="w-full px-2 bg-white dark:bg-gray-800">
      <div className="z-100 sticky top-0 bg-white dark:bg-gray-800 px-5 pt-8 pb-1">
        <div className="flex items-center justify-between">
          <span className="text-sm font-light text-gray-800 dark:text-gray-400">
            {task.assignee}
          </span>
          <Chip name={task.status || "TODO"} color={STATUS_COLORS[task.status || "TODO"]} />
        </div>

        <div>
          <h1 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white">{task.name}</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
        </div>
      </div>

      <div className="px-5 py-4">
        <div className="p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
          <h2 className="text-base font-medium text-gray-800 dark:text-white">Actions</h2>
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            <TaskActionsInline task={task} />
          </div>
        </div>
      </div>

      {task.subtasks.length > 0 && (
        <div className="px-5 py-4">
          <TaskList withHeader tasks={task.subtasks} />{" "}
        </div>
      )}

      <div className="px-5 py-4">
        <div className="p-4 bg-gray-100 rounded-lg dark:bg-gray-700">
          <h2 className="text-base font-medium text-gray-800 dark:text-white">
            Final Execution Result
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            {task.execution_result || "Not executed yet"}
          </p>
        </div>
        {/* Content */}
        <Chat task={task} />
      </div>
    </div>
  );
}
