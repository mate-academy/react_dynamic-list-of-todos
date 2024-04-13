import { createContext, useState } from 'react';
import { Todo } from './types/Todo';
import { Filter } from './types/Filter';

type Props = {
  children: React.ReactNode;
};

type Value = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  appliedQuery: string;
  setAppliedQuery: (query: string) => void;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  selectedTodo: Todo | null;
  setSelectedTodo: (selectedTodo: Todo | null) => void;
};

const initianValue: Value = {
  todos: [],
  setTodos: () => {},
  appliedQuery: '',
  setAppliedQuery: () => {},
  filter: Filter.all,
  setFilter: () => {},
  selectedTodo: null,
  setSelectedTodo: () => {},
};

export const TodoContext = createContext(initianValue);
export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [appliedQuery, setAppliedQuery] = useState('');
  const [filter, setFilter] = useState<Filter>(Filter.all);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const value: Value = {
    todos,
    setTodos,
    appliedQuery,
    setAppliedQuery,
    filter,
    setFilter,
    selectedTodo,
    setSelectedTodo,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
