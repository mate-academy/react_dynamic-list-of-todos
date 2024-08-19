export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export type FilterStatusType = 'all' | 'active' | 'completed';
