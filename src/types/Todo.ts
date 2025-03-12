export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export type TodoCondition = 'all' | 'active' | 'completed';
