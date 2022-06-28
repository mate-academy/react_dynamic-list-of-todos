import React, { useEffect, useState } from 'react';
import { fetchUsers } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number;
  onSelectUser: (userId: number) => void;
};

export const CurrentUser: React.FC<Props> = ({
  selectedUserId,
  onSelectUser,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(
    () => {
      fetchUsers(selectedUserId)
        .then(response => {
          setUser(response);
        });
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
        onClick={() => onSelectUser(0)}
      >
        Clear
      </button>
    </div>
  );
};
