import { UserInterface } from './UserInterface';

interface TodoInterface {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface TodoWithUserInterface extends TodoInterface {
  user: UserInterface;
}
