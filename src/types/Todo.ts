export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export enum TodoSelect {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
