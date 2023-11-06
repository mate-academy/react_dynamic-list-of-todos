import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from './types/Todo';
import { getTodos } from './api';
import { Status } from './types/Status';

const initialTodos: Todo[] = [];

type TodosContextType = {
  todos: Todo[];
  visibleTodos: Todo[];
  selectedTodo: Todo | null;
  setSelectedTodo: (_todo: Todo | null) => void;
  setFilter: React.Dispatch<React.SetStateAction<Status>>;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: initialTodos,
  visibleTodos: initialTodos,
  selectedTodo: null,
  setSelectedTodo: () => {},
  setFilter: () => {},
  setQuery: () => {},
  query: '',
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [filter, setFilter] = useState(Status.ALL);
  const [query, setQuery] = useState('');

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case Status.ACTIVE:
        return todo.completed;

      case Status.COMPLETED:
        return !todo.completed;

      case Status.ALL:
      default:
        return todo;
    }
  }).filter(todo => todo.title.includes(query.toLowerCase()));

  const value = useMemo(() => ({
    todos,
    visibleTodos,
    selectedTodo,
    setSelectedTodo,
    setFilter,
    setQuery,
    query,
  }), [todos, selectedTodo, visibleTodos, query]);

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
