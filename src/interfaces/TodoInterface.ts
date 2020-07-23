import { User } from './UserInterface';

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User;
}
