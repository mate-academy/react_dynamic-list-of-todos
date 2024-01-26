import { Todo } from './Todo';
import { User } from './User';

export interface State {
  todos: Todo[],
  currentTodo: Todo | null,
  currentUser: User | null,
  isEyeSlash: boolean,
  filterBy: string,
  query: string,
}
