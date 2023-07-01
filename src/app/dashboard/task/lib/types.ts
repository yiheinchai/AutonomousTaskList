export type tTask = {
  id: number;
  name: string;
  assignee: string;
  status: string;
  subtasks: tTask[];
};

export type tDbTask = {
  id: number;
  name: string;
  assignee: string;
  status: string;
  parentId: number | null;
};
