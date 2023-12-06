import React, { useEffect, useState } from 'react';
import { getTodos, getUser } from '../../api';
import { Filter } from '../../types/Filter';
import { State } from '../../types/State';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

const initialState: State = {
  todos: [],
  setTodos: () => { },
  selectedTodo: null,
  setSelectedTodo: () => { },
  user: null,
  setUser: () => {},
  loading: false,
  setLoading: () => { },
  filterBy: Filter.ALL,
  setFilterBy: () => {},
  filterByQuery: '',
  setFilterByQuery: () => {},
  hasTodoModal: false,
  setHasTodoModal: () => { },
};

export const StateContext = React.createContext(initialState);

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [filterBy, setFilterBy] = useState(Filter.ALL);
  const [filterByQuery, setFilterByQuery] = useState('');
  const [hasTodoModal, setHasTodoModal] = useState(false);

  const value = {
    todos,
    setTodos,
    selectedTodo,
    setSelectedTodo,
    user,
    setUser,
    loading,
    setLoading,
    filterBy,
    setFilterBy,
    filterByQuery,
    setFilterByQuery,
    hasTodoModal,
    setHasTodoModal,
  };

  useEffect(() => {
    setLoading(true);

    setTimeout(() => {
      getTodos()
        .then(setTodos)
        .finally(() => setLoading(false));
    }, 200);
  }, []);

  useEffect(() => {
    if (selectedTodo) {
      getUser(selectedTodo.userId)
        .then(setUser);
    }
  }, [selectedTodo]);

  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  );
};
