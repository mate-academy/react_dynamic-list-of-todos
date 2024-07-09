import { Todo } from './Todo';
import { User } from './User';

export interface States {
  todos: Todo[];
  query: string;
  errorMessage: string;
  isLoading: boolean;
  isModalOpened: boolean;
  updateAt: Date;
  selectedTodoId: number | null;
  selectedTodoUser: User | undefined;
  filteredTodos: Todo[];
}
