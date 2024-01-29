import React, { useState } from 'react';
import { Todo } from '../types/Todo';

interface TodoContextProps {
  selectedTodo: Todo | null;
  selectTodo: (todo: Todo | null) => void;
}

export const TodoContext = React.createContext<TodoContextProps>({
  selectedTodo: null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  selectTodo: (_todo: Todo | null) => {},
});

interface Props {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [shownTodo, setShownTodo] = useState<Todo | null>(null);

  function selectTodo(todo: Todo | null) {
    setShownTodo(todo);
  }

  return (
    <TodoContext.Provider value={{
      selectedTodo: shownTodo,
      selectTodo,
    }}
    >
      {children}
    </TodoContext.Provider>
  );
};
