import { User } from './User';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}

export interface TodoWithUser extends Omit<Todo, 'userId'>{
  user: User | null;
}
