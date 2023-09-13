import React, { createContext, useState } from 'react';
import { User } from '../types/User';
import { UserContextType } from '../types/UserContext';
import { getUser } from '../api';

export const UserContext = createContext<UserContextType>({
  user: null,
  onUpdateUser: () => {},
  userLoading: false,
});

type Props = {
  children: React.ReactNode;
};

export const UserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(false);

  const onUpdateUser = (id: number) => {
    setUserLoading(true);
    getUser(id)
      .then((newUser) => setUser(newUser))
      .finally(() => setUserLoading(false));
  };

  const value = {
    user,
    onUpdateUser,
    userLoading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
