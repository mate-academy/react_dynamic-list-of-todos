import { Dispatch, SetStateAction } from 'react';
import { Todo } from './Todo';

export enum Filter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

export interface TodosContextType {
  todos: Todo[];
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  query: string;
  setQuery: (query: string) => void;
  selectedTodoId: number;
  setSelectedTodoId: (id: number) => void;
}
