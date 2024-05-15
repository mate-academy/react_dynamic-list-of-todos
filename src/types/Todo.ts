export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export type InitialStates = {
  query: string;
  select: string;
};
