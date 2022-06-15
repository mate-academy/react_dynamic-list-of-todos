import React, { useEffect, useState } from 'react';
import { getUsers } from '../../api/api';
import './CurrentUser.scss';

interface Prop {
  userId: number,
  setSelectedUserId: React.Dispatch<React.SetStateAction<number>>,
}

export const CurrentUser: React.FC<Prop> = ({ userId, setSelectedUserId }) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    getUsers(userId)
      .then(element => setUser(element));
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {user?.id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user?.name}</h3>
      <p className="CurrentUser__email">{user?.email}</p>
      <p className="CurrentUser__phone">{user?.phone}</p>
      <button
        type="button"
        className="TodoList__user-button--selected button"
        onClick={() => setSelectedUserId(0)}
      >
        Clear
      </button>
    </div>
  );
};
