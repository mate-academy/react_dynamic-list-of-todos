import {
  createContext, useState, useEffect, useContext, ReactNode, useMemo,
} from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

const TodoContext = createContext<{
  todos: Todo[] | null;
  visibleTodos: Todo[];
  filteredTodos: Todo[] | null;
  query: string;
  setQuery:(str: string) => void;
  setFilteredTodos: (todos: Todo[]) => void;
  isLoading: boolean;
  selectedTodoData: {
    userId: number | null;
    todo: Todo | null;
  }
  setSelectedTodoData: (data:
  { userId: number | null; todo: Todo | null }) => void;
} | null>(null);

export const TodoProvider: React.FC<{ children: ReactNode }> = (
  { children },
) => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTodoData, setSelectedTodoData] = useState<{
    userId: number | null;
    todo: Todo | null;
  }>({ userId: null, todo: null });
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [filteredTodos, setFilteredTodos] = useState<Todo[] | null>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    setIsLoading(true);
    const loadTodos = async () => {
      const fetchedTodos = await getTodos();

      setTodos(fetchedTodos);
      setFilteredTodos(fetchedTodos);
    };

    loadTodos().finally(() => setIsLoading(false));
  }, []);

  const visibleTodos = useMemo(() => {
    if (!filteredTodos) {
      return [];
    }

    let filtered = [...filteredTodos];

    filtered = filtered.filter(todo => todo.title
      .toLocaleLowerCase().includes(query.toLocaleLowerCase()));

    return filtered;
  }, [filteredTodos, query]);

  const value = useMemo(() => {
    return {
      todos,
      visibleTodos,
      filteredTodos,
      query,
      setQuery,
      setFilteredTodos,
      isLoading,
      selectedTodoData,
      setSelectedTodoData,
    };
  }, [todos, visibleTodos, filteredTodos, query, isLoading, selectedTodoData]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('No context provided');
  }

  return context;
};
