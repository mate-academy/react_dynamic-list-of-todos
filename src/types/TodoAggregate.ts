import { Todo } from './Todo';
import { User } from './User';

export interface TodoAggregate extends Todo {
  user: User;
}
