import { Todo } from './Todo';
import { User } from './User';

export type TodoDetail = Todo & {
  user: User
};
