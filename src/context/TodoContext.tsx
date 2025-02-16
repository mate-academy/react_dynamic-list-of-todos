import React, { createContext, useMemo, useState } from 'react';
import { TodoWithUser } from '../types/TodoWithUser';

interface TodoContextType {
  todo: TodoWithUser;
  setTodo: (todo: TodoWithUser) => void;
}

const initialTodo: TodoWithUser = {
  id: 0,
  title: '',
  completed: false,
  userId: 0,
  user: undefined,
};

export const TodoContext = createContext<TodoContextType>({
  todo: initialTodo,
  setTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoContextProvider: React.FC<Props> = ({ children }) => {
  const [todo, setTodo] = useState(initialTodo);

  const value = useMemo(() => ({ todo, setTodo }), [todo]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
