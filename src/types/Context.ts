import { Status } from './Status';
import { Todo } from './Todo';

export type Context = {
  areTodosLoading: boolean,
  visibleTodos: Todo[],
  query: string,
  setQuery: (newQuery: string) => void,
  status: Status,
  setStatus: (filter: Status) => void,
  todoOnView: Todo | null,
  setTodoOnView: (todo: Todo | null) => void,
};
