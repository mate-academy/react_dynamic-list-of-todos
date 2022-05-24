import React from 'react';
import './CurrentUser.scss';
import { User } from '../../types/user';

type Callback = () => void;

type Props = {
  user: User;
  onClearUser: Callback;
};

export const CurrentUser: React.FC<Props> = ({ user, onClearUser }) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title">
      <span>
        {`Selected user: ${user.id}`}
      </span>
    </h2>

    <h3
      data-cy="userName"
      className="CurrentUser__name"
    >
      {user.name}
    </h3>
    <p className="CurrentUser__email">{user.email}</p>
    <p className="CurrentUser__phone">{user.phone}</p>

    <button
      type="button"
      name="clear"
      className="CurrentUser__button-clear button is-danger"
      onClick={onClearUser}
    >
      Clear
    </button>
  </div>
);
