export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export const enum Status {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
