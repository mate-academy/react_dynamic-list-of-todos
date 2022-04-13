import { createContext, useContext } from 'react';

export const SelectedUserIdContext
  = createContext<SelectedUserId>({
    selectedUserId: 0,
    setSelectedUserId: () => {},
  });

export const useSelectedUserIdContext = () => (
  useContext(SelectedUserIdContext)
);
