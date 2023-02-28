import { User } from './User';

export interface TodoWithUserInfo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user: User;
}
