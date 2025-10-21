export type FilterStatus = 'all' | 'completed' | 'active';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}
