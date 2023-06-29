export type tTask = {
  id: number;
  name: string;
  assignee: string;
  status: string;
  subtasks: tTask[];
};
