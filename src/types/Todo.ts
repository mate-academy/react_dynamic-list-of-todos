import { Todo } from "./Todo";

// eslint-disable-next-line no-redeclare, @typescript-eslint/no-redeclare
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
