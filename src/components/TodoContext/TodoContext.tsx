import React, { createContext, useState } from 'react';
import { Filter } from '../../types/Filter';
import { Todo } from '../../types/Todo';
import { Context } from '../../types/TodoContext';

export const TodoContext = createContext<Context>({
  loading: false,
  setLoading: () => { },
  todos: [],
  setTodos: () => { },
  query: '',
  setQuery: () => { },
  filter: Filter.All,
  setFilter: () => { },
  activeTodo: null,
  setActiveTodo: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState(Filter.All);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  const value = {
    loading,
    setLoading,
    todos,
    setTodos,
    query,
    setQuery,
    filter,
    setFilter,
    activeTodo,
    setActiveTodo,
  };

  return (
    <TodoContext.Provider value={value}>{children}</TodoContext.Provider>
  );
};
