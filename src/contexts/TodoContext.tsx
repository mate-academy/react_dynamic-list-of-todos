/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';
import { SelectedTodo } from '../types/SelectedTodo';
import { Todo } from '../types/Todo';

const initialSelect: SelectedTodo = {
  todo: {} as Todo,
  isSelected: false,
};

export const TodoContext = React.createContext({
  selectedTodo: {} as SelectedTodo,
  setSelectedTodo: (_newTodo: SelectedTodo) => {},
});

interface Props {
  children: React.ReactNode;
}

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [selectedTodo, setSelectedTodo] = useState(initialSelect);

  const value = useMemo(
    () => ({
      selectedTodo,
      setSelectedTodo,
    }),
    [selectedTodo],
  );

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
