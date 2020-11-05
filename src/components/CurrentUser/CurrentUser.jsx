import React from 'react';
import { CurrentUserProps } from '../../props/CurrentUserProps';
import './CurrentUser.scss';

export const CurrentUser = ({
  user: { id, name, email, phone },
  resetUser,
}) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title">
      <span>
        Selected user:
        {' '}
        {id}
      </span>
    </h2>

    <h3 className="CurrentUser__name">{name}</h3>
    <p className="CurrentUser__email">{email}</p>
    <p className="CurrentUser__phone">{phone}</p>

    <button
      type="button"
      className="CurrentUser__button button"
      onClick={resetUser}
    >
      Clear
    </button>
  </div>
);

CurrentUser.propTypes = CurrentUserProps;
