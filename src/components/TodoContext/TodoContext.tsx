import React, { createContext, useState } from 'react';
import { Todo } from '../../types/Todo';

type ContextObject = {
  showedTodo: Todo | null;
  setShowedTodo: (u: Todo | null) => void;
};

export const TodoContext = createContext<ContextObject>({
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
