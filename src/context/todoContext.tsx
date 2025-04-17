import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

type TodoContextType = {
  todos: Todo[];
  allTodos: Todo[];
  setTodos: (todo: Todo[]) => void;
};

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  allTodos: [],
  setTodos: () => {},
});

type Props = {
  children?: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [allTodos, setAllTodos] = useState<Todo[]>([]);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      allTodos,
    }),
    [todos],
  );

  useEffect(() => {
    getTodos().then(todolist => {
      setTodos(todolist);
      setAllTodos(todolist);
    });
  }, []);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
