import React from 'react';

import './CurrentUser.scss';

type Props = {
  user: User;
  onClearUser: () => void;
};

export const CurrentUser: React.FC<Props> = (props) => (
  <div className="CurrentUser">
    <button
      onClick={() => props.onClearUser()}
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
        {props.user.id}
      </span>
    </h2>

    <h3 className="CurrentUser__name">{props.user.name}</h3>
    <p className="CurrentUser__email">{props.user.website}</p>
    <p className="CurrentUser__phone">{props.user.phone}</p>
  </div>
);
