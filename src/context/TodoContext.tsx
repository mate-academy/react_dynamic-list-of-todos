/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {
  ReactNode,
  useState,
  useMemo,
  useEffect,
} from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { User } from '../types/User';
import { getTodos, getUser } from '../api/api';

type Props = {
  children: ReactNode
};

export const TodoContext = React.createContext({
  todos: [] as Todo[],
  todo: null as Todo | null,
  status: Status.All,
  query: '',
  user: null as User | null,
  loading: false,
  userLoading: false,
});

export const TodoUpdateContext = React.createContext({
  setTodos: (_todos: Todo[]) => { },
  setTodo: (_todo: Todo | null) => { },
  setStatus: (_status: Status) => { },
  setQuery: (_query: string) => { },
  setUser: (_user: User | null) => { },
  setLoading: (_loading: boolean) => { },
  setUserLoading: (_loading: boolean) => { },
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [status, setStatus] = useState(Status.All);
  const [query, setQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTodos()
      .then(data => setTodos(data))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setUserLoading(true);

    if (todo) {
      getUser(todo.userId)
        .then(data => setUser(data))
        .finally(() => setUserLoading(false));
    }
  }, [todo]);

  const valueTodoContext = {
    todos,
    todo,
    status,
    query,
    user,
    loading,
    userLoading,
  };

  const valueTodoUpdateContext = useMemo(() => {
    return {
      setTodos,
      setTodo,
      setStatus,
      setQuery,
      setUser,
      setLoading,
      setUserLoading,
    };
  }, []);

  return (
    <TodoUpdateContext.Provider value={valueTodoUpdateContext}>
      <TodoContext.Provider value={valueTodoContext}>
        {children}
      </TodoContext.Provider>
    </TodoUpdateContext.Provider>
  );
};
