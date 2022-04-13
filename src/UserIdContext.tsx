import React, {
  useMemo,
  useState,
} from 'react';

interface UserIdContextInterfaces {
  selectedUserId: number,
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>,
}

export const UserIdContext = React.createContext<UserIdContextInterfaces>({
  selectedUserId: 0,
  setSelectedUserId: () => {},
});

export const UserIdProvider: React.FC = ({ children }) => {
  const [selectedUserId, setSelectedUserId] = useState(0);

  const contextValue = useMemo(() => ({
    selectedUserId,
    setSelectedUserId,
  }), [selectedUserId, setSelectedUserId]);

  return (
    <UserIdContext.Provider value={contextValue}>
      {children}
    </UserIdContext.Provider>
  );
};
