export interface Todo {
  id: number;
  userId: number;
  completed: boolean;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}
