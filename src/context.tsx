import React, { useState } from 'react';

import { Todo } from './types/Todo';
import { User } from './types/User';
import * as API from './api';

type TodoContextTypes = {
  getTodosAPI: (cb: () => {}) => {},
  getUserAPI: (userId: number) => {},
  todos: [],
  setTodos: (todos: Todo[]) => {},
  loading: false,
  setLoading: (loading: boolean) => {},
  showModal: false,
  setShowModal: (showModal: boolean) => {},
  todo: null,
  setTodo: (todo: Todo | null) => {},
  user: null,
  setUser: (user: User | null) => {},
  status: '',
  setStatus: (status: string) => {},
  searchField: '',
  setSearchField: (searchField: string) => {},
};

type TodoContextProps = {
  getTodosAPI: (cb: () => {}) => void,
  getUserAPI: (userId: number) => void,
  todos: Todo[],
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

export const TodoContext = React.createContext<TodoContextProps>(
  {} as TodoContextTypes,
);

type Props = {
  children: React.ReactNode
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
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
