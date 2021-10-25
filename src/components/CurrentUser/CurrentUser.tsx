import React from 'react';
import './CurrentUser.scss';

type Props = {
  user: User,
  clear: () => void,
};

export const CurrentUser: React.FC<Props> = ({ user, clear }) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title">
      <span>
        {`Selected user: ${user.name}`}
      </span>
    </h2>

    <h3 className="CurrentUser__name">
      {user && (
        user.name
      )}
    </h3>
    <p className="CurrentUser__email">{user.email}</p>
    <p className="CurrentUser__phone">{user.phone}</p>
    <button
      type="button"
      className="button is-primary is-fullwidth mt-5"
      onClick={clear}
    >
      Clear
    </button>
  </div>
);
