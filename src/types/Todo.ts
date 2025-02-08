export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export type CompletedType = 'all' | 'completed' | 'active';
