export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export type TodoFilterOptions = {
  query: string;
  select: string;
};
