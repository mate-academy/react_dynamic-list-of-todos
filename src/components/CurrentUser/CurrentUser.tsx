import React, { useEffect, useState } from 'react';
import './CurrentUser.scss';
import { getUser } from '../../api/api';

 type Props = {
   userId: number,
   selectUser: (x:number) => void
 };

export const CurrentUser: React.FC<Props> = ({ userId, selectUser }) => {
  const [user, setUser] = useState({
    id: userId,
    name: 'Anonymus',
    phone: '7777',
    email: 'Anonymus',
  });

  useEffect(() => {
    const API_USER_URL = `https://mate.academy/students-api/users/${userId}`;

    getUser(API_USER_URL)
      .then((userFromServer) => {
        setUser(userFromServer);
      });
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {userId}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>

      <button
        type="button"
        className="button"
        onClick={() => {
          selectUser(0);
        }}
      >
        Clear
      </button>
    </div>
  );
};
