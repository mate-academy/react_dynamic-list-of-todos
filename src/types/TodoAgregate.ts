import { Todo } from './Todo';
import { User } from './User';

export interface TodoAgregate extends Todo {
  user: User;
}
