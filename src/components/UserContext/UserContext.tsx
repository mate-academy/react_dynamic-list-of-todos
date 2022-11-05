import React, { useState, useCallback } from 'react';
import { getTodos, getUser } from '../../api';
import { SortTypes } from '../../types/SortTypes';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';
import { debounce } from '../utils/debounce';

type Context = {
  todos: Todo[],
  selectedUser: number,
  selectedTodoId: number,
  userInfo: User | null,
  sortType: SortTypes,
  query: string,
  appliedQuery: string,
  isLoaded: boolean,
  isError: boolean,

  getUserFromServer: () => void,
  handleClose: () => void,
  getTodosFromServer: () => void,
  changeSortType: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  applyQuery: ((arg: string) => void),
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
  clearSearchBar: () => void,
  selectCurrentTodo: (id: number, userId: number) => void
};

export const UserContext = React.createContext<Context>({
  todos: [],
  selectedUser: 0,
  selectedTodoId: 0,
  userInfo: null,
  sortType: SortTypes.ALL,
  query: '',
  appliedQuery: '',
  isLoaded: true,
  isError: false,

  getUserFromServer: () => {},
  handleClose: () => {},
  getTodosFromServer: () => {},
  changeSortType: () => {},
  applyQuery: () => {},
  handleSearch: () => {},
  clearSearchBar: () => {},
  selectCurrentTodo: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [sortType, setSortType] = useState<SortTypes>(SortTypes.ALL);
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(true);
  const [isError, setIsError] = useState(false);

  async function getTodosFromServer() {
    try {
      const newTodos = await getTodos();

      setIsError(false);
      setIsLoaded(false);
      setTodos(newTodos);
    } catch {
      setIsError(true);
      setIsLoaded(false);
      throw new Error('Can\'t load list of todos');
    }
  }

  async function getUserFromServer() {
    const user = await getUser(selectedUser);

    setUserInfo(user);
  }

  function handleClose() {
    setUserInfo(null);
    setSelectedUser(0);
    setSelectedTodoId(0);
  }

  function changeSortType(event: React.ChangeEvent<HTMLSelectElement>) {
    const currentValue = event.target.value as SortTypes;

    setSortType(currentValue);
  }

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000),
    []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    applyQuery(event.target.value);
  };

  const clearSearchBar = () => {
    setQuery('');
    setAppliedQuery('');
  };

  const selectCurrentTodo = (id: number, userId: number) => {
    setSelectedUser(userId);
    setSelectedTodoId(id);
  };

  const contextValue = {
    todos,
    selectedUser,
    selectedTodoId,
    userInfo,
    sortType,
    query,
    appliedQuery,
    isLoaded,
    isError,

    getUserFromServer,
    handleClose,
    getTodosFromServer,
    changeSortType,
    applyQuery,
    handleSearch,
    clearSearchBar,
    selectCurrentTodo,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
