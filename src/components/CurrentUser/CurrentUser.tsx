import React, { useCallback, useEffect, useState } from 'react';
import { getUsers } from '../../api';
import './CurrentUser.scss';

interface Props {
  userId: number;
  onSelectHandler: (userId: number) => void;
}

export const CurrentUser: React.FC<Props> = ({
  userId,
  onSelectHandler,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const selectUser = useCallback(async (id: number) => {
    try {
      const selectedUser = await getUsers(id);

      if (selectedUser.id) {
        setUser(selectedUser);
      }
    } catch {
      setUser(null);
    }
  }, [userId]);

  useEffect(() => {
    selectUser(userId);
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${userId}`}</span></h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>

      <button
        type="button"
        className="button"
        onClick={() => onSelectHandler(0)}
      >
        Clear
      </button>
    </div>
  );
};
