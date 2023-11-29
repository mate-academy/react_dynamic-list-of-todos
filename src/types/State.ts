import { Todo } from './Todo';
import { User } from './User';
import { Filter } from './Filter';

export type State = {
  todos: Todo[];
  openedTodo: Todo;
  user: User;
  filter: {
    option: Filter;
    query: string;
  };
  isModalOpened: boolean;
  isLoadingTodos: boolean;
  isLoadingUser: boolean;
};
