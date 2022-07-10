import React, { useCallback, useEffect, useState } from 'react';
import { fetchUsers } from '../../api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number;
  handleSelectUser: (userId: number) => void;
};

export const CurrentUser: React.FC<Props> = ({
  selectedUserId,
  handleSelectUser,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = useCallback(async (id: number) => {
    try {
      const userFromServer = await fetchUsers(id);

      if (userFromServer.id) {
        setUser(userFromServer);
      }
    } catch {
      setUser(null);
    }
  }, [selectedUserId]);

  useEffect(
    () => {
      getUser(selectedUserId);
    },
    [selectedUserId],
  );

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`User #${user?.id}`}</span></h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>

      <button
        className="CurrentUser__clear"
        type="button"
        onClick={() => handleSelectUser(0)}
      >
        Clear
      </button>
    </div>
  );
};
