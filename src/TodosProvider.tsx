import React, { useState } from 'react';
import { Todo } from './types/Todo';

type Props = {
  children: React.ReactNode,
};

export enum Status {
  'all' = 'all',
  'active' = 'active',
  'completed' = 'completed',
}

interface Context {
  prepareTodos: (
    todosList: Todo[],
    status: Status,
    query?: string,
  ) => Todo[]
  setFilteredToods: (value: React.SetStateAction<Todo[]>) => void
  filteredToods: Todo[]
  searchValue: string,
  setSearchValue: React.Dispatch<React.SetStateAction<string>>,
  selectedTodo: Todo | null,
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>,
}

export const TodosContext = React.createContext<Context>({
  prepareTodos: () => [],
  setFilteredToods: () => {},
  filteredToods: [],
  searchValue: '',
  setSearchValue: () => {},
  selectedTodo: null,
  setSelectedTodo: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [filteredToods, setFilteredToods] = useState<Todo[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  function prepareTodos(
    todosList: Todo[],
    status: Status,
    query?: string,
  ): Todo[] {
    return todosList.filter(todo => {
      switch (status) {
        case Status.all:
          if (query) {
            return (todo.completed || !todo.completed)
            && todo.title.toLowerCase().includes(query.toLowerCase());
          }

          return (todo.completed || !todo.completed);
        case Status.active:
          if (query) {
            return (!todo.completed)
            && todo.title.toLowerCase().includes(query.toLowerCase());
          }

          return !todo.completed;
        case Status.completed:
          if (query) {
            return (todo.completed)
            && todo.title.toLowerCase().includes(query.toLowerCase());
          }

          return todo.completed;
        default:
          return true;
      }
    });
  }

  return (
    <TodosContext.Provider value={{
      prepareTodos,
      setFilteredToods,
      filteredToods,
      searchValue,
      setSearchValue,
      selectedTodo,
      setSelectedTodo,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
