export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum CompletedFilter {
  All = 0,
  Active = 1,
  Completed = 2,
}
