import TaskList from "../components/TaskList";
import { getTask, getTasks } from "../db/methods";
import Chip from "@/app/components/Chip";
import { STATUS_COLORS } from "../lib/consts";
import ChatBubbleSystem from "./components/ChatBubbleSystem";
import ChatBubbleUser from "./components/ChatBubbleUser";
import { convertStringToMdHTML } from "../utils/utils";
import ChatFooter from "./components/ChatFooter";

export async function generateStaticParams() {
  const tasks = await getTasks();

  return tasks.map((task) => ({
    id: task.id,
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const task = await getTask(params.id);
  return (
    <div className="m-3">
      <div className="w-full px-2 bg-white dark:bg-gray-800">
        <div className="z-100 sticky top-0 bg-white px-5 pt-8 pb-1">
          <div className="bg-white flex items-center justify-between">
            <span className="text-sm font-light text-gray-800 dark:text-gray-400">
              {task.assignee}
            </span>
            <Chip name={task.status || "TODO"} color={STATUS_COLORS[task.status || "TODO"]} />
          </div>

          <div>
            <h1 className="mt-2 text-lg font-semibold text-gray-800 dark:text-white">
              {task.name}
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{task.description}</p>
          </div>
        </div>

        {task.subtasks.length > 0 && (
          <div className="px-5 py-4">
            <TaskList withHeader tasks={task.subtasks} />{" "}
          </div>
        )}

        <div className="px-5 py-4">
          <div className="p-3 bg-gray-100 rounded-lg dark:bg-gray-800">
            <h2 className="text-sm font-medium text-gray-800 dark:text-white">Execution Result</h2>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {task.execution_result || "Not executed yet"}
            </p>
          </div>
          {/* Content */}
          <div className="mt-4 p-3 bg-gray-100 rounded-lg dark:bg-gray-800">
            <h2 className="text-sm font-medium text-gray-800 dark:text-white">Activity</h2>
            <ul className="mt-4 space-y-5">
              {task.chat_history != null &&
                task.chat_history.map(async (chat, index) => {
                  const content = (await convertStringToMdHTML(chat.content)).toString();
                  if (chat.role === "system") {
                    return <ChatBubbleSystem key={chat.content.slice(0, 10)} content={content} />;
                  }

                  if (chat.role === "user") {
                    return <ChatBubbleUser key={chat.content.slice(0, 10)} content={content} />;
                  }
                })}
            </ul>
          </div>

          <ChatFooter />
        </div>
      </div>
    </div>
  );
}
