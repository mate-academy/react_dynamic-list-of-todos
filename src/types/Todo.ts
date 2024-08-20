export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum FilterStatusType {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}
