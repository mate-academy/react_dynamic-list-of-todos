import { Filter } from './Filter';
import { Todo } from './Todo';

export type Context = {
  loading: boolean;
  setLoading: (v: boolean) => void;
  todos: Todo[];
  setTodos: (todo: Todo[]) => void;
  query: string;
  setQuery: (v: string) => void;
  filter: Filter;
  setFilter: (v: Filter) => void;
  activeTodo: Todo | null,
  setActiveTodo: (v: Todo | null) => void
};
