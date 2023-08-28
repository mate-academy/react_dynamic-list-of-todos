import React, { useMemo, useState } from 'react';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

type ContextProps = {
  todos: Todo[],
  setTodos: (newTodos: Todo[]) => void,
  query: string,
  setQuery: (newQuery: string) => void,
  filterType: Filter,
  setFilterType: (newType: Filter) => void,
  filteredItems: Todo[],
  selectedTodo: Todo | null,
  setSelectedTodo: (newTodo: Todo | null) => void,
};

export const TodosContext = React.createContext<ContextProps>({
  todos: [],
  setTodos: () => {},
  query: '',
  setQuery: () => {},
  filterType: Filter.ALL,
  setFilterType: () => {},
  filteredItems: [],
  selectedTodo: null,
  setSelectedTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterType, setFilterType] = useState<Filter>(Filter.ALL);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredItems = useMemo(() => {
    let filtered = todos.filter((todo) => {
      switch (filterType) {
        case Filter.COMPLETED:
          return todo.completed;
        case Filter.ACTIVE:
          return !todo.completed;
        default:
          return true;
      }
    });

    if (query) {
      filtered = filtered.filter(
        (todo) => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filtered;
  }, [todos, filterType, query]);

  const value = useMemo(() => ({
    todos,
    setTodos,
    query,
    setQuery,
    filterType,
    setFilterType,
    filteredItems,
    selectedTodo,
    setSelectedTodo,
  }), [todos, filterType, query, selectedTodo]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
