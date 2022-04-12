import React from 'react';

type SelectedUserId = {
  selectedUserId: number,
  setSelectedUserId: (id: number) => void,
};

export const SelectUserIdContext = React.createContext<SelectedUserId>({
  selectedUserId: 0,
  setSelectedUserId: () => {},
});
