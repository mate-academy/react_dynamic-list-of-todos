import React from 'react';

import './CurrentUser.scss';

type Props = {
  user: User;
  onClearUser: () => void;
};

export const CurrentUser: React.FC<Props> = ({ user, onClearUser }) => (
  <div className="CurrentUser">
    <button
      onClick={() => onClearUser()}
      className="
        TodoList__user-button
        TodoList__user-button--selected
        button
      "
      type="button"
    >
      Clear
    </button>

    <h2 className="CurrentUser__title">
      <span>
        Selected user:
        {' '}
        {user.id}
      </span>
    </h2>

    <h3 className="CurrentUser__name">{user.name}</h3>
    <p className="CurrentUser__email">{user.website}</p>
    <p className="CurrentUser__phone">{user.phone}</p>
  </div>
);
