import { createContext } from 'react';
import { TodosContextType } from './types/TodosContextType';

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  selectedTodo: null,
  setSelectedTodo: () => {},
  setActiveFilter: () => {},
  query: '',
  setQuery: () => {},
});
