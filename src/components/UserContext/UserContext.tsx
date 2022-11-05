import React, { useState } from 'react';
import { getUser } from '../../api';
import { User } from '../../types/User';

type Context = {
  selectedUser: number,
  selectedTodoId: number,
  userInfo: User | null,

  getUserFromServer: () => void,
  handleClose: () => void,
  selectCurrentTodo: (id: number, userId: number) => void
};

export const UserContext = React.createContext<Context>({
  selectedUser: 0,
  selectedTodoId: 0,
  userInfo: null,

  getUserFromServer: () => {},
  handleClose: () => {},
  selectCurrentTodo: () => {},
});

export const UserProvider: React.FC = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(0);
  const [selectedTodoId, setSelectedTodoId] = useState(0);
  const [userInfo, setUserInfo] = useState<User | null>(null);

  async function getUserFromServer() {
    const user = await getUser(selectedUser);

    setUserInfo(user);
  }

  function handleClose() {
    setUserInfo(null);
    setSelectedUser(0);
    setSelectedTodoId(0);
  }

  const selectCurrentTodo = (id: number, userId: number) => {
    setSelectedUser(userId);
    setSelectedTodoId(id);
  };

  const contextValue = {
    selectedUser,
    selectedTodoId,
    userInfo,

    getUserFromServer,
    handleClose,
    selectCurrentTodo,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
