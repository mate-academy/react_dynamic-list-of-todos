import { User } from './User';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}

export enum TodoFilterBy {
  NONE = 'all',
  COMPLETED = 'completed',
  ACTIVE = 'active',
}
