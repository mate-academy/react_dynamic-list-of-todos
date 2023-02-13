export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export const enum TodoStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
