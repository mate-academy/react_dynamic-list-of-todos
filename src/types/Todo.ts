export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum StatusToFilter {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
