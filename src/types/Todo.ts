import { User } from './User';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface UsersTodo extends Todo {
  user: User;
}

export enum TodoSelect {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
