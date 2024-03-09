import React, { useState, useMemo } from 'react';
import { Todo } from './Todo';

interface ContextCurrentTodo {
  currentTodo: Todo;
  setCurrent: React.Dispatch<React.SetStateAction<Todo>>;
}

export const CurrentTodo = React.createContext<ContextCurrentTodo>({
  currentTodo: {
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  },
  setCurrent: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const SelectedTodo: React.FC<Props> = ({ children }) => {
  const [currentTodo, setCurrent] = useState<Todo>({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });

  const currentTodoContext = useMemo(
    () => ({
      currentTodo,
      setCurrent,
    }),
    [currentTodo, setCurrent],
  );

  return (
    <CurrentTodo.Provider value={currentTodoContext}>
      {children}
    </CurrentTodo.Provider>
  );
};
