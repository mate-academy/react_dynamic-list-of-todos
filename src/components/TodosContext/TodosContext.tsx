import React, { useMemo, useState, createContext } from 'react';
import { Todo } from '../../types/Todo';

export const TodosContext = createContext<{
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
}>({
  selectedTodo: null,
  setSelectedTodo: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const value = useMemo(() => ({
    selectedTodo,
    setSelectedTodo,
  }), [selectedTodo, setSelectedTodo]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
