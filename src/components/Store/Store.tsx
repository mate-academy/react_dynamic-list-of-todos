import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../../types/Todo';
import { getTodos } from '../../utils/todos';
import { FilterParams } from '../../types/filterParams';
import { getFilteredTodos } from '../../services/getfilteredTodos';

type TodosContextType = {
  todos: Todo[];
  loading: boolean;
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<Todo | null>;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  filter: FilterParams
  setFilter: React.Dispatch<React.SetStateAction<FilterParams>>
};

type Props = {
  children: React.ReactNode;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  loading: false,
  selectedTodo: null,
  setSelectedTodo: () => {},
  title: '',
  setTitle: () => {},
  filter: FilterParams.All,
  setFilter: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const [title, setTitle] = useState('');
  const [filter, setFilter] = useState(FilterParams.All);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(response => {
        const result = getFilteredTodos(response, filter, title);

        setTodos(result);
      })
      .catch(() => { })
      .finally(() => {
        setLoading(false);
      });
  }, [filter, title]);

  const value = useMemo(() => ({
    todos,
    loading,
    selectedTodo,
    setSelectedTodo,
    title,
    setTitle,
    filter,
    setFilter,
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }), [todos, loading, selectedTodo, title, filter]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
