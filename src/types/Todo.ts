export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export type StatusFilterValue = 'all' | 'completed' | 'active';
