export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum State {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type Filter = {
  state: State;
  query: string;
};
