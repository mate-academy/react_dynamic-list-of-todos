import { Todo } from './Todo';
import { User } from './User';

export interface State {
  todos: Todo[];
  selectedTodo: Todo | null;
  user: User | null;
  filter: string;
  query: string;
  modalVisible: boolean;
  isLoadingTodos: boolean;
  isLoadingUsers: boolean;
}
