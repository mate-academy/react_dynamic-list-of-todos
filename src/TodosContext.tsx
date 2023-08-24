import React, { useMemo, useState } from 'react';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

type TodosGlobalContext = {
  setTodos: (t: Todo[]) => void,
  filter: Filter,
  setFilter: (f: Filter) => void,
  query: string,
  setQuery: (q: string) => void,
  filteredTodos: Todo[],
  selectedTodo: Todo | null,
  setSelectedTodo: (todo: Todo | null) => void,
};

export const TodosContext = React.createContext<TodosGlobalContext>({
  setTodos: () => {},
  filter: Filter.All,
  setFilter: () => {},
  query: '',
  setQuery: () => {},
  filteredTodos: [],
  selectedTodo: null,
  setSelectedTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState(Filter.All);
  const [query, setQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const filteredTodos = useMemo(() => {
    let filtered = todos.filter(todo => {
      switch (filter) {
        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
          return todo.completed;

        default:
          return true;
      }
    });

    if (query) {
      filtered = filtered.filter(
        todo => todo.title.toLowerCase().includes(query.toLowerCase()),
      );
    }

    return filtered;
  }, [todos, filter, query]);

  const value = useMemo(() => {
    return {
      setTodos,
      filter,
      setFilter,
      query,
      setQuery,
      filteredTodos,
      selectedTodo,
      setSelectedTodo,
    };
  }, [todos, filter, query, selectedTodo]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
