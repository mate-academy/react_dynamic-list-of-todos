import React, { useState } from 'react';

import { Todo } from './types/Todo';
import { User } from './types/User';
import * as API from './api';

type Context = {
  getTodosAPI: (cb: () => {}) => void,
  getUserAPI: (userId: number) => void,
  todos: Todo[] | null,
  setTodos: (todos: Todo[]) => void,
  loading: boolean,
  setLoading: (loading: boolean) => void,
  showModal: boolean,
  setShowModal: (showModal: boolean) => void,
  todo: Todo | null,
  setTodo: (todo: Todo | null) => void,
  user: User | null,
  setUser: (user: User | null) => void,
  status: string,
  setStatus: (status: string) => void,
  searchField: string,
  setSearchField: (searchField: string) => void,
};

export const TodoContext = React.createContext<Context>({
  /* eslint-disable-next-line */
  getTodosAPI: (_cb: () => {}) => {},
  /* eslint-disable-next-line */
  getUserAPI: (_userId: number) => {},
  todos: [],
  /* eslint-disable-next-line */
  setTodos: (_todos: Todo[]) => {},
  loading: false,
  /* eslint-disable-next-line */
  setLoading: (_loading: boolean) => {},
  showModal: false,
  /* eslint-disable-next-line */
  setShowModal: (_showModal: boolean) => {},
  todo: null,
  /* eslint-disable-next-line */
  setTodo: (_todo: Todo | null) => {},
  user: null,
  /* eslint-disable-next-line */
  setUser: (_user: User | null) => {},
  status: '',
  /* eslint-disable-next-line */
  setStatus: (_status: string) => {},
  searchField: '',
  /* eslint-disable-next-line */
  setSearchField: (_searchField: string) => {},
});

type Props = {
  children: React.ReactNode
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [todo, setTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [status, setStatus] = useState('');
  const [searchField, setSearchField] = useState('');

  const getTodosAPI = async (cb: () => {}) => {
    const todoItems: Todo[] = await API.getTodos();

    setTodos(todoItems);
    cb();
  };

  const getUserAPI = async (userId: number) => {
    const userItem: User = await API.getUser(userId);

    setUser(userItem);
    setLoading(false);
  };

  const value = {
    getTodosAPI,
    getUserAPI,
    todos,
    setTodos,
    loading,
    setLoading,
    showModal,
    setShowModal,
    todo,
    setTodo,
    user,
    setUser,
    status,
    setStatus,
    searchField,
    setSearchField,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
