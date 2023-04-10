export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum StatusToFilterBy {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
