export interface Todo {
  includes(query: string): unknown;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
