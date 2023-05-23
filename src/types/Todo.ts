export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum FilterType {
  ALL = 'all',
  COMPLETE = 'complete',
  ACTIVE = 'active',
}
