import React, { useEffect, useState, useMemo } from 'react';
import { Context, Status, Todo } from './types';
import { getTodos } from './api';
import { getVisibleTodos } from './utils';

export const TodosContext = React.createContext({} as Context);

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [areTodosLoading, setAreTodosLoading] = useState(false);
  const [todoOnView, setTodoOnView] = useState<Todo | null>(null);
  const [status, setStatus] = useState(Status.All);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    setAreTodosLoading(true);
    getTodos()
      .then(setAllTodos)
      .finally(() => {
        setAreTodosLoading(false);
      });
  }, []);

  const visibleTodos = getVisibleTodos(allTodos, { query, status });

  const value: Context = useMemo(() => ({
    areTodosLoading,
    visibleTodos,
    query,
    setQuery,
    status,
    setStatus,
    todoOnView,
    setTodoOnView,
  }), [areTodosLoading, allTodos, todoOnView, status, query]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
