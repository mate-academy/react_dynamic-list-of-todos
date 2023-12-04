import React, { useState } from 'react';

import { Todo } from './types/Todo';
import { User } from './types/User';
import * as API from './api';

export const TodoContext = React.createContext({
  /* eslint-disable-next-line */
  getTodosAPI: (_cb: () => {}) => {},
  /* eslint-disable-next-line */
  getUserAPI: (_userId: number) => {},
  todos: [] as Todo[],
  /* eslint-disable-next-line */
  setTodos: (_todos: Todo[]) => {},
  loading: false,
  /* eslint-disable-next-line */
  setLoading: (_loading: boolean) => {},
  showModal: false,
  /* eslint-disable-next-line */
  setShowModal: (_showModal: boolean) => {},
  todo: {} as Todo,
  /* eslint-disable-next-line */
  setTodo: (_todo: Todo) => {},
  user: {} as User,
  /* eslint-disable-next-line */
  setUser: (_user: User) => {},
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
  const [todos, setTodos] = useState([] as Todo[]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [todo, setTodo] = useState({} as Todo);
  const [user, setUser] = useState({} as User);
  const [status, setStatus] = useState('all');
  const [searchField, setSearchField] = useState('');

  const getTodosAPI = async (cb: () => {}) => {
    const todoItem = await API.getTodos();

    setTodos(todoItem);
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
