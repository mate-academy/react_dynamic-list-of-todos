import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/api';
import './CurrentUser.scss';

type Props = {
  userId: number;
  isSelected: (id: number) => void,
};

export const CurrentUser: React.FC<Props> = ({ userId, isSelected }) => {
  const [selectedUser, setSelectedUser] = useState<User>();

  const loadUser = async () => {
    const getUsersFromApi = await getUsers(userId);

    setSelectedUser(getUsersFromApi);
  };

  useEffect(() => {
    loadUser();
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${userId}`}</span>
      </h2>
      <h3 className="CurrentUser__name">{ selectedUser?.name }</h3>
      <p className="CurrentUser__email">{ selectedUser?.email }</p>
      <p className="CurrentUser__phone">{selectedUser?.phone}</p>

      <button
        type="button"
        onClick={() => isSelected(0)}
      >
        Clear
      </button>
    </div>
  );
};
