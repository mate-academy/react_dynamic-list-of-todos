import { Todo } from './Todo';
import { User } from './User';

export interface FullTodos extends Todo {
  user: User;
}
