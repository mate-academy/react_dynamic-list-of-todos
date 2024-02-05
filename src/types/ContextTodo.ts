import { Todo } from './Todo';
import { User } from './User';

export interface ContextTodo {
  allTodos: Todo[];
  filteredTodos: Todo[];
  isLoading: boolean;
  isLoadingModal: boolean;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  selectOption: string;
  setSelectOption: React.Dispatch<React.SetStateAction<string>>;
  selectTodo: Todo | null;
  setSelectTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
  user: User | null;
}
