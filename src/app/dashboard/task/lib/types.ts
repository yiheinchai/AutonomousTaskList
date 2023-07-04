export type tOpenaiMessage = { role: "system" | "user"; content: string };
export interface OpenAIStreamPayload {
  model: string;
  messages: tOpenaiMessage[];
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
  stream: boolean;
  n: number;
}

export enum Status {
  TODO = "TODO",
  IN_PROGRESS = "IN_PROGRESS",
  DONE = "DONE",
}

export interface tDbTask {
  id: string;
  name: string;
  assignee: string;
  status?: Status;
  description: string | null;
  chat_history?: tOpenaiMessage[];
  execution_result: string | null;
  parentId: string | null;
}

export interface tTask extends tDbTask {
  subtasks: tTask[];
}

export type tTaskCreationForm = Partial<tTask> & Pick<tTask, "name">;
export type tTaskUpdateForm = Partial<tTask> & Pick<tTask, "id">;
