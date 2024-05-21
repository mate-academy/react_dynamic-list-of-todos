import React, { useState } from 'react';
import { Todo } from '../types/Todo';

interface TodoManager {
  todo: Todo | null;
  setTodo: (todo: Todo | null) => void;
}

export const CurrentTodo = React.createContext<TodoManager>({
  todo: null,
  setTodo: () => {},
});

export const CurrentTodoProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currentTodo, setCurrentTodo] = useState<Todo | null>(null);

  return (
    <CurrentTodo.Provider
      value={{
        todo: currentTodo,
        setTodo: (todo: Todo | null) => setCurrentTodo(todo),
      }}
    >
      {children}
    </CurrentTodo.Provider>
  );
};
