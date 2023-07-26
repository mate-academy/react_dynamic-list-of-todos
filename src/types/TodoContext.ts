import { Todo } from './Todo';
import { FILTER } from './filterEnum';

export type Context = {
  todos: Todo[];
  isTodoLoading: boolean;
  toggleModal: () => void;
  isOpenModal: boolean;
  searchField: string;
  filterField: FILTER;
  onUpdateSearch: (char: string) => void;
  onUpdateFilter: (char: FILTER) => void;
  currentTodo: Todo | null;
  updateCurrentTodo: (todo: Todo) => void;
};
