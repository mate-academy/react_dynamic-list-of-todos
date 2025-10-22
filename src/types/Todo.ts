export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum FilterTypes {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}
