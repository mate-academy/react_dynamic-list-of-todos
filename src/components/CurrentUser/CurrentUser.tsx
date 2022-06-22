import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api';

interface Props {
  userId: number,
  selectUser: (userId: number) => void,
}

export const CurrentUser: React.FC<Props> = ({ userId, selectUser }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUser(userId).then(UserFromServer => {
      setUser(UserFromServer);
    });
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{user?.id}</span>
      </h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>

      <button
        className="
          TodoList__user-button
          TodoList__user-button--selected
          button
         "
        type="button"
        onClick={() => {
          selectUser(0);
        }}
      >
        Clear
      </button>
    </div>
  );
};
