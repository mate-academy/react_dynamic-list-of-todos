import React from 'react';
import { Todo } from '../types/Todo';

type TodoContextType = {
  filterBy: string;
  setFilterBy: (filterBy: string) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
  currentTodo: Todo | null;
  setCurrentTodo: (todo: Todo | null) => void;
};

export const TodoContext = React.createContext<TodoContextType>({
  filterBy: 'all',
  setFilterBy: () => {},
  searchQuery: '',
  setSearchQuery: () => {},
  currentTodo: null,
  setCurrentTodo: () => {},
});
