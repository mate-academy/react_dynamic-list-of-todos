import React, { useEffect, useState } from 'react';
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
  const [currentUser, setCurrentUser] = useState<User | undefined>();

  const selectUser = async () => {
    const selectedUser = await getUsers(userId);

    setCurrentUser(selectedUser);
  };

  useEffect(() => {
    selectUser();
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title"><span>{`Selected user: ${userId}`}</span></h2>

      <h3 className="CurrentUser__name">{currentUser?.name}</h3>
      <p className="CurrentUser__email">{currentUser?.email}</p>
      <p className="CurrentUser__phone">{currentUser?.phone}</p>

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
