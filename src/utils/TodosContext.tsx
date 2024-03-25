import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Todo } from '../types/Todo';
import { Filter, TodosContextType } from '../types/Context';

interface TodosProviderProps {
  children: ReactNode;
}

const initialTodosContext: TodosContextType = {
  todos: [],
  setTodos: () => {},
  filter: Filter.ALL,
  setFilter: () => {},
  query: '',
  setQuery: () => {},
  selectedTodoId: 0,
  setSelectedTodoId: () => {},
};

const TodosContext = createContext<TodosContextType>(initialTodosContext);

export const TodosProvider: React.FC<TodosProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>(Filter.ALL);
  const [query, setQuery] = useState('');
  const [selectedTodoId, setSelectedTodoId] = useState(0);

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        filter,
        setFilter,
        query,
        setQuery,
        selectedTodoId,
        setSelectedTodoId,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const context = useContext(TodosContext);

  return context;
};
