export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum TodoStatus {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
  Default = All,
}
