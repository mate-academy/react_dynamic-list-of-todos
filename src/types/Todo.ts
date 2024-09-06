export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum TodoStatusFilter {
  All = 'all',
  Completed = 'completed',
  Active = 'active',
}
