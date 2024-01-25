import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../utils/todos';

type TodosContextType = {
  todos: Todo[];
  loading: boolean;
  filteredTodos: Todo[];
  setFilteredTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<Todo | null>
};

type Props = {
  children: React.ReactNode;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  loading: false,
  filteredTodos: [],
  setFilteredTodos: () => {},
  selectedTodo: null,
  setSelectedTodo: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      getTodos()
        .then(setTodos)
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    }, 100);
  }, []);

  useEffect(() => {
    setFilteredTodos(todos);
  }, [todos]);

  const value = useMemo(() => ({
    todos,
    loading,
    filteredTodos,
    setFilteredTodos,
    selectedTodo,
    setSelectedTodo,
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [todos, loading, filteredTodos, selectedTodo]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
