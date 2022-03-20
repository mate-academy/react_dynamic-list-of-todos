import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../API/api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number,
  clearUser: () => void,
};

export const CurrentUser: React.FC<Props> = ({ selectedUserId, clearUser }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getCurrentUser(selectedUserId)
      .then(setUser);
  }, [selectedUserId]);

  return (
    user ? (
      <>
        <div className="CurrentUser">
          <h2 className="CurrentUser__title"><span>{`Selected user: ${user.id}`}</span></h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
        </div>
        <button
          className="CurrentUser__button button"
          type="button"
          onClick={() => clearUser()}
        >
          clear
        </button>
      </>
    )
      : <p>No user selected</p>
  );
};
