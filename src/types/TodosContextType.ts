import { Status } from './Status';
import { Todo } from './Todo';

export type TodosContextType = {
  todos: Todo[],
  selectedTodo: Todo | null,
  setSelectedTodo: (value: Todo | null) => void,
  setActiveFilter: (value: Status) => void,
  query: string,
  setQuery: (value: string) => void,
};
