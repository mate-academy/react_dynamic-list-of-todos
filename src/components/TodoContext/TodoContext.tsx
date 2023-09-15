import React, { createContext, useState } from 'react';
import { Todo } from '../../types/Todo';

type TodoContextType = {
  showedTodo: Todo | null;
  setShowedTodo: (todo: Todo | null) => void;
};

export const TodoContext = createContext<TodoContextType>({
  showedTodo: null,
  setShowedTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoContextProvider:React.FC<Props> = ({ children }) => {
  const [showedTodo, setShowedTodo] = useState<Todo | null>(null);

  return (
    <TodoContext.Provider value={{ showedTodo, setShowedTodo }}>
      {children}
    </TodoContext.Provider>
  );
};
