/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  ReactNode,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { getTodos } from '../api/api';

type Props = {
  children: ReactNode
};

export const TodoContext = React.createContext({
  todos: [] as Todo[],
  setTodos: (_todos: Todo[]) => { },
  selectedTodo: null as Todo | null,
  setSelectedTodo: (_todo: Todo | null) => { },
  status: Status.All,
  setStatus: (_status: Status) => { },
  query: '',
  setQuery: (_query: string) => { },
  loading: false,
  setLoading: (_loading: boolean) => { },
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState(Status.All);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => setTodos(data))
      .finally(() => setLoading(false));
  }, []);

  const valueTodoContext = useMemo(() => {
    return {
      todos,
      setTodos,
      selectedTodo,
      setSelectedTodo,
      status,
      setStatus,
      query,
      setQuery,
      loading,
      setLoading,
    };
  }, [todos, selectedTodo, status, query, loading]);

  return (
    <TodoContext.Provider value={valueTodoContext}>
      {children}
    </TodoContext.Provider>
  );
};
