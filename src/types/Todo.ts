export interface Todo {
  [index: string]: number | string | boolean,
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
