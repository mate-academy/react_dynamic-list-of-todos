import React from 'react';
import './CurrentUser.scss';

type Props = {
  user: User;
  clear: (id: number) => void;
};

export const CurrentUser: React.FC<Props> = ({ user, clear }) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title">
      <span>
        Selected user:&nbsp;
        {user.id}
      </span>
    </h2>
    <h3 className="CurrentUser__name">{user.name}</h3>
    <p className="CurrentUser__email">{user.email}</p>
    <p className="CurrentUser__phone">{user.phone}</p>
    <button
      className="button"
      type="button"
      onClick={() => clear(0)}
    >
      Clear
    </button>
  </div>
);
