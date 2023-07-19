import { User } from './User';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User | null;
}

export enum FilterBy {
  COMPLETED = 'completed',
  ACTIVE = 'active',
  ALL = 'all',
}
