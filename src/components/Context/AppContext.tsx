import React, { useContext, useState, useEffect } from 'react';
import { Todo } from '../../types/Todo';
import { ContextType } from '../../types/Context';
import { getTodos } from '../../api';

type Props = {
  children: React.ReactNode,
};

const INITIAL_CONTEXT = {
  todos: [],
  setTodos: () => { },
  selectedTodoId: 0,
  setSelectedTodoId: () => { },
  searchQuery: '',
  setSearchQuery: () => { },
  filterType: '',
  setFilterType: () => { },
  listLoader: false,
  setListLoader: () => { },
  modalLoader: false,
  setModalLoader: () => { },
};

const AppContext = React.createContext<ContextType>(INITIAL_CONTEXT);

export const AppProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [listLoader, setListLoader] = useState(false);
  const [modalLoader, setModalLoader] = useState(false);

  useEffect(() => {
    setListLoader(true);

    getTodos()
      .then(setTodos)
      .finally(() => setListLoader(false));
  }, []);

  const value = {
    todos,
    setTodos,
    selectedTodoId,
    setSelectedTodoId,
    searchQuery,
    setSearchQuery,
    filterType,
    setFilterType,
    listLoader,
    setListLoader,
    modalLoader,
    setModalLoader,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export function useAppContext() {
  const appContext = useContext(AppContext);

  if (!appContext) {
    throw new Error('AppContext is null');
  }

  return appContext;
}
