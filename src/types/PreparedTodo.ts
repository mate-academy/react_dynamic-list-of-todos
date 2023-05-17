import { Todo } from './Todo';
import { User } from './User';

export interface PrepaparedTodo extends Todo {
  user: User,
}
