import React, { useEffect, useState } from 'react';
import { getUser } from '../../api';
import './CurrentUser.scss';

type Props = {
  userId: number,
  setSelectedUserId: any,
};

interface User {
  name: string,
  email: string,
  phone: string,
}

const defaultUser = {
  name: '-',
  email: '-',
  phone: '-',
};

export const CurrentUser: React.FC<Props> = ({
  userId,
  setSelectedUserId,
}) => {
  const [user, setUser] = useState<User>(defaultUser);

  useEffect(() => {
    getUser(userId)
      .then(currentUser => setUser(currentUser));
  }, [userId]);

  const { name, email, phone } = user;

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {' '}
          {userId}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{name}</h3>
      <p className="CurrentUser__email">{email}</p>
      <p className="CurrentUser__phone">{phone}</p>

      <button
        type="button"
        onClick={() => setSelectedUserId(0)}
        className="button"
      >
        Clear
      </button>
    </div>
  );
};
