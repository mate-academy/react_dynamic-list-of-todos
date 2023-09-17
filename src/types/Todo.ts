export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum ETodoStatus {
  ALL = 'all',
  Active = 'active',
  Completed = 'completed',
}
