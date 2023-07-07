import { Todo } from './Todo';

export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface TodoUser extends User {
  todo: Todo,
}
