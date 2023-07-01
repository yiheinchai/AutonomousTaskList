export type tOpenaiMessage = { role: "system" | "user"; content: string };

export interface tDbTask {
  id: number;
  name: string;
  assignee: string;
  status: string;
  description: string | null;
  chat_history?: tOpenaiMessage[];
  execution_result: string | null;
  parentId: number | null;
}

export interface tTask extends tDbTask {
  subtasks: tTask[];
}

export type tTaskCreationForm = Partial<tTask> & Pick<tTask, "name">;
export type tTaskUpdateForm = Partial<tTask> & Pick<tTask, "id">;
