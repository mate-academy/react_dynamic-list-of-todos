import React, { useEffect, useMemo, useState } from 'react';
import { getTodos, getUser } from '../../api';
import { User } from '../../types/User';
import { Context } from '../../types/Context';
import { Todo } from '../../types/Todo';
import { Status } from '../../types/Status';

type Props = {
  children: React.ReactNode;
};

export const TodoContext = React.createContext<Context>({
  todos: [] as Todo[],
  user: null,
  setUser: () => {},
  selectedTodo: null,
  setSelectedTodo: () => {},
  showModal: false,
  setShowModal: () => {},
  status: Status.All,
  setStatus: () => {},
  query: '',
  setQuery: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([] as Todo[]);
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState(Status.All);
  const [query, setQuery] = useState<string>('');

  useEffect(() => {
    getTodos().then(setTodos);
  }, []);

  const value = useMemo(
    () => ({
      todos,
      user,
      setUser,
      selectedTodo,
      setSelectedTodo,
      showModal,
      setShowModal,
      status,
      setStatus,
      query,
      setQuery,
    }),
    [todos, user, showModal, selectedTodo, status, query],
  );

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId).then(setUser);
    }
  }, [selectedTodo]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
