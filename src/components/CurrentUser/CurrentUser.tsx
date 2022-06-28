import React, { useCallback, useEffect, useState } from 'react';
import { fetchUsers } from '../../api/api';
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

  // I couldn't handle the empty user
  // when there is no user the app stucks
  // I tried getUser funct but it didn't work

  const getUser = useCallback(async (id: number) => {
    try {
      const userFromServer = await fetchUsers(id);

      if (userFromServer.id) {
        setUser(userFromServer);
      } else {
        setUser(null);
      }
    } catch {
      throw new Error('User could not load from server');
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
