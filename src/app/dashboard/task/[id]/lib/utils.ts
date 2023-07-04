import { tTask } from "../../lib/types";
import { convertStringToMdHTML } from "../../utils/utils";

export async function convertChatHistoryToMd(task: tTask): Promise<tTask> {
  const chatHistory = task.chat_history || [];
  const mdChatHistory = await Promise.all(
    chatHistory.map(async (message) => {
      const content = (await convertStringToMdHTML(message.content)).toString();
      return { ...message, content };
    })
  );
  const execution_result = (
    await convertStringToMdHTML(task.execution_result || "Not executed yet")
  )?.toString();

  return { ...task, chat_history: mdChatHistory, execution_result };
}
