import { User } from './User';

export interface TodoInfo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}
