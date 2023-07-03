import Chip from "@/app/components/Chip";
import { STATUS_COLORS } from "../../lib/consts";
import { tTask } from "../../lib/types";
import Image from "next/image";
import ChatBubbleSystem from "./ChatBubbleSystem";
import ChatBubbleUser from "./ChatBubbleUser";
import { convertStringToMdHTML } from "../../utils/utils";
export default function TaskSidebar({ task }: { task: tTask }) {
  return (
    <aside className="rounded-md shadow-lg fixed right-0 inset-y-0 flex flex-col w-1/2 h-screen overflow-y-auto bg-white border-r rtl:border-r-0 rtl:border-l dark:bg-gray-900 dark:border-gray-700">
      <div
        style={{
          position: "absolute",
          left: "0px",
          width: "0px",
          flexGrow: 0,
          zIndex: 109,
          top: "0px",
          bottom: "0px",
          pointerEvents: "auto",
        }}
      >
        <div
          style={{ cursor: "col-resize", height: "100%", width: "12px", marginLeft: "-6px" }}
        ></div>
      </div>
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
        </div>

        {/* Search */}

        <footer className="max-w-4xl mx-auto sticky bottom-0 bg-white border-t border-gray-200 pt-2 pb-4 sm:pt-4 sm:pb-6 px-4 sm:px-6 lg:px-0 dark:bg-slate-900 dark:border-gray-700">
          <div className="flex justify-between items-center mb-3">
            <button
              type="button"
              className="inline-flex justify-center items-center gap-x-2 rounded-md font-medium text-gray-800 hover:text-blue-600 text-xs sm:text-sm dark:text-gray-200 dark:hover:text-blue-500"
            >
              <svg
                className="h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 2C8.47339 2 8.85714 2.38376 8.85714 2.85714V7.14286L13.1429 7.14286C13.6162 7.14286 14 7.52661 14 8C14 8.47339 13.6162 8.85714 13.1429 8.85714L8.85714 8.85715V13.1429C8.85714 13.6162 8.47339 14 8 14C7.52661 14 7.14286 13.6162 7.14286 13.1429V8.85715L2.85714 8.85715C2.38376 8.85715 2 8.4734 2 8.00001C2 7.52662 2.38376 7.14287 2.85714 7.14287L7.14286 7.14286V2.85714C7.14286 2.38376 7.52661 2 8 2Z"
                  fill="currentColor"
                />
              </svg>
              New chat
            </button>

            <button
              type="button"
              className="py-1.5 px-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-xs dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
            >
              <svg
                className="w-3 h-3"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z" />
              </svg>
              Stop generating
            </button>
          </div>

          {/* Input */}
          <div className="relative">
            <textarea
              className="p-4 pb-12 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
              placeholder="Ask me anything..."
            ></textarea>

            {/* Toolbar */}
            <div className="absolute bottom-px inset-x-px p-2 rounded-b-md bg-white dark:bg-slate-900">
              <div className="flex justify-between items-center">
                {/* Button Group */}
                <div className="flex items-center">
                  {/* Mic Button */}
                  <button
                    type="button"
                    className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:hover:text-blue-500"
                  >
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                      <path d="M11.354 4.646a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708l6-6a.5.5 0 0 1 .708 0z" />
                    </svg>
                  </button>
                  {/* End Mic Button */}

                  {/* Attach Button */}
                  <button
                    type="button"
                    className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:hover:text-blue-500"
                  >
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                    </svg>
                  </button>
                  {/* End Attach Button */}
                </div>
                {/* End Button Group */}

                {/* Button Group */}
                <div className="flex items-center gap-x-1">
                  {/* Mic Button */}
                  <button
                    type="button"
                    className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:hover:text-blue-500"
                  >
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                      <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
                    </svg>
                  </button>
                  {/* End Mic Button */}

                  {/* Send Button */}
                  <button
                    type="button"
                    className="inline-flex flex-shrink-0 justify-center items-center h-8 w-8 rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <svg
                      className="h-3.5 w-3.5"
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                    </svg>
                  </button>
                  {/* End Send Button */}
                </div>
                {/* End Button Group */}
              </div>
            </div>
            {/* End Toolbar */}
          </div>
          {/* End Input */}
        </footer>
        {/* End Search */}
      </div>
      {/* End Content */}
    </aside>
  );
}
