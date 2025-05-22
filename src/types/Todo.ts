export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum TodoState {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
