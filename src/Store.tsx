/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useState } from 'react';
import { Todo } from './types/Todo';

export enum Status {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const FilterContext = createContext({
  filter: Status.All,
  setFilter: (_value: Status) => {},
});

export const SelectedTodoContext = createContext({
  selectedTodo: null as Todo | null,
  setSelectedTodo: (_todo: Todo | null) => {},
});

interface Props {
  children: React.ReactNode;
}

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState(Status.All);

  return (
    <FilterContext.Provider value={{ filter, setFilter }}>
      <SelectedTodoContext.Provider value={{ selectedTodo, setSelectedTodo }}>
        {children}
      </SelectedTodoContext.Provider>
    </FilterContext.Provider>
  );
};
