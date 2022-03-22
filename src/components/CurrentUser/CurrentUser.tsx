import React, { useEffect, useState } from 'react';
import { getCurrentUser } from '../../API/api';
import './CurrentUser.scss';

type Props = {
  selectedUserId: number,
  clearUser: () => void,
};

export const CurrentUser: React.FC<Props> = ({ selectedUserId, clearUser }) => {
  const [user, setUser] = useState<User>();
  const [fetchError, setFetchError] = useState(false);

  useEffect(() => {
    setFetchError(false);
    getCurrentUser(selectedUserId)
      .then(setUser)
      .catch(() => setFetchError(true));
  }, [selectedUserId]);

  if (fetchError) {
    return (
      <div
        className="Error"
      >
        Неверный адрес пользователя!!!
      </div>
    );
  }

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
          onClick={clearUser}
        >
          clear
        </button>
      </>
    )
      : <p>Loading...</p>
  );
};
