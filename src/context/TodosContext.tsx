import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { getTodos, getUser } from '../api';
import { Filter } from '../types/Filter';
import { User } from '../types/User';

const FilterSelect = {
  All: 'all',
  Active: 'active',
  Completed: 'completed',
};

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
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  selectedTodo: Todo | null;
  setSelectedTodo: React.Dispatch<React.SetStateAction<Todo | null>>;
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
  },
  setFilter: () => { },
  visibleTodos: [],
  user: null,
  setUser: () => { },
  selectedTodo: null,
  setSelectedTodo: () => { },
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
  });
  const [user, setUser] = useState<User | null>(null);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [loadingModal, setLoadingModal] = useState<boolean>(false);

  const visibleTodos = useMemo(() => {
    return todos.filter(todo => {
      const matchesFilterSelect
        = filter.select === FilterSelect.All
        || (filter.select === FilterSelect.Active && !todo.completed)
        || (filter.select === FilterSelect.Completed && todo.completed);

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
    if (selectedTodo !== null) {
      getUser(selectedTodo.id)
        .then(setUser)
        .finally(() => setLoading(false));
    } else {
      setUser(null);
      setLoading(false);
    }
  }, [selectedTodo]);

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
      selectedTodo,
      setSelectedTodo,
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
    selectedTodo,
    setSelectedTodo,
  ]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
