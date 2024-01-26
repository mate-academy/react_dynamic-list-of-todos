import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos, getUser } from '../api';
import { Filter } from '../types/Filter';
import { User } from '../types/User';

export const TodosContext = React.createContext<{
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  visibleTodos: Todo[];
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  userTodo: Todo;
  setUserTodo: React.Dispatch<React.SetStateAction<Todo>>;
  loadingModal: boolean;
  setLoadingModal: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  todos: [],
  setTodos: () => { },
  loading: true,
  setLoading: () => { },
  modal: true,
  setModal: () => { },
  filter: {
    select: 'all',
    input: '',
    submit: false,
  },
  setFilter: () => { },
  visibleTodos: [],
  user: {
    id: 0,
    name: '',
    email: '',
    phone: '',
  },
  setUser: () => { },
  userTodo: {
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  },
  setUserTodo: () => null,
  loadingModal: false,
  setLoadingModal: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modal, setModal] = useState<boolean>(false);
  const [filter, setFilter] = useState({
    select: 'all',
    input: '',
    submit: false,
  });
  const [user, setUser] = useState<User>({
    id: 0,
    name: '',
    email: '',
    phone: '',
  });
  const [userTodo, setUserTodo] = useState<Todo>({
    id: 0,
    title: '',
    completed: false,
    userId: 0,
  });
  const [loadingModal, setLoadingModal] = useState<boolean>(false);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesFilterSelect
        = filter.select === 'all'
        || (filter.select === 'active' && !todo.completed)
        || (filter.select === 'completed' && todo.completed);

      const matchesFilterInput = todo.title
        .toLowerCase()
        .includes(filter.input.toLowerCase().trim());

      return matchesFilterSelect && matchesFilterInput;
    });
  }, [todos, filter]);

  useEffect(() => {
    getTodos()
      .then(setTodos)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (userTodo !== null) {
      getUser(userTodo.id)
        .then(setUser)
        .finally(() => setLoading(false));
    } else {
      setUser({
        id: 0,
        name: '',
        email: '',
        phone: '',
      });
      setLoading(false);
    }
  }, [userTodo]);

  const value = useMemo(() => {
    return {
      todos,
      setTodos,
      loading,
      setLoading,
      filter,
      setFilter,
      visibleTodos,
      modal,
      setModal,
      user,
      setUser,
      loadingModal,
      setLoadingModal,
      userTodo,
      setUserTodo,
    };
  }, [
    todos,
    setTodos,
    loading,
    setLoading,
    filter,
    setFilter,
    visibleTodos,
    modal,
    setModal,
    user,
    setUser,
    loadingModal,
    setLoadingModal,
    userTodo,
    setUserTodo,
  ]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
