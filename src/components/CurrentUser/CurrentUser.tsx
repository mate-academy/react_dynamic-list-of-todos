import React from 'react';
import './CurrentUser.scss';
import { User } from '../../types/user';

type Props = {
  user: User,
  clearUser: any,
};

export const CurrentUser: React.FC<Props> = ({ user, clearUser }) => (
  <div className="CurrentUser">
    <button
      onClick={clearUser}
      type="button"
      className="button"
    >
      Clear user
    </button>
    <h2 className="CurrentUser__title">
      <span>
        Selected user:
        {user.id}
      </span>
    </h2>

    <h3 className="CurrentUser__name">{user.name}</h3>
    <p className="CurrentUser__email">{user.email}</p>
    <p className="CurrentUser__phone">{user.phone}</p>
  </div>
);
