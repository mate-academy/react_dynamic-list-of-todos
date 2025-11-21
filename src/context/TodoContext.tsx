import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Todo } from '../types/Todo';
import { getTodos } from '../api';

interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  filter: 'all' | 'completed' | 'active';
  searchQuery: string;
  selectedTodo: Todo | null;
  setFilter: (filter: 'all' | 'completed' | 'active') => void;
  setSearchQuery: (query: string) => void;
  setSelectedTodo: (todo: Todo | null) => void;
  filteredTodos: Todo[];
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined,
);
export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        setLoading(true);
        const data = await getTodos();

        setTodos(data);
      } catch (error) {
        // error handling intentionally silent for tests
      } finally {
        setLoading(false);
      }
    };

    loadTodos();
  }, []);

  const filteredTodos = todos.filter(todo => {
    const statusMatch =
      filter === 'all' ||
      (filter === 'completed' && todo.completed) ||
      (filter === 'active' && !todo.completed);

    const searchMatch = todo.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return statusMatch && searchMatch;
  });

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        filter,
        searchQuery,
        selectedTodo,
        setFilter,
        setSearchQuery,
        setSelectedTodo,
        filteredTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  const context = React.useContext(TodoContext);

  if (context === undefined) {
    throw new Error(
      'useTodoContext должен быть использован внутри TodoProvider',
    );
  }

  return context;
};
