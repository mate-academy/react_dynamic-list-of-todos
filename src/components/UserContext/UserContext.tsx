import React, { useState, useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { User } from '../../types/User';

type Context = {
  todos: Todo[],
  setTodos: (todosFromServer: Todo[]) => void,
  selectedUser: number,
  setSelectedUser: (selectedUser: number) => void,
  selectedTodoId: number,
  setSelectedTodoId: (selectedTodoId: number) => void,
  userInfo: User | null,
  setUserInfo: (userData: User | null) => void,
  sortType: string,
  setSortType: (type: string) => void,
  query: string,
  setQuery: (newQuery: string) => void,
  appliedQuery: string,
  setAppliedQuery: (finalQuery: string) => void,
};

export const UserContext = React.createContext<Context>({
  todos: [],
  setTodos: () => {},
  selectedUser: 0,
  setSelectedUser: () => {},
  selectedTodoId: 0,
  setSelectedTodoId: () => {},
  userInfo: null,
  setUserInfo: () => {},
  sortType: 'all',
  setSortType: () => {},
  query: '',
  setQuery: () => {},
  appliedQuery: '',
  setAppliedQuery: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [sortType, setSortType] = useState('all');
  const [query, setQuery] = useState('');
  const [appliedQuery, setAppliedQuery] = useState('');

  const contextValue = useMemo(() => ({
    todos,
    setTodos,
    selectedUser,
    setSelectedUser,
    selectedTodoId,
    setSelectedTodoId,
    userInfo,
    setUserInfo,
    sortType,
    setSortType,
    query,
    setQuery,
    appliedQuery,
    setAppliedQuery,
  }), [
    todos,
    selectedUser,
    userInfo,
    selectedTodoId,
    sortType,
    query,
    appliedQuery]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
