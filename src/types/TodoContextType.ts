import { Status } from './Status';
import { Todo } from './Todo';

export type TodosContextType = {
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
  visibleTodos: () => Todo[];
  filter: Status;
  setFilter: (value: Status) => void;
  // selectedTodo: Todo | null;
  // setSelectedTodo: (value: Todo | null) => void;
};
