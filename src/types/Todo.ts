export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum ETodoStatus {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
