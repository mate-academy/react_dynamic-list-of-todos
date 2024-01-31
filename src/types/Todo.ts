export interface Todo {
  filter(arg0: (todo: any) => any): unknown;
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
