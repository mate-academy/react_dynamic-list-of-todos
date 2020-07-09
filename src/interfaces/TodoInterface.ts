import { UserInterface } from './UserInterface';

export interface TodoInterface {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: UserInterface;
}
