export interface Todo {
  filter(arg0: (todo: Todo) => boolean): Todo[];
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
