import React from 'react';
import { CurrentUserType } from '../PropTypes/CurrentUserType';
import './CurrentUser.scss';

export const CurrentUser = ({ name, id, email, phone, onClear }) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title">
      <span>
        Selected user:
        {id}
      </span>
    </h2>

    <h3 className="CurrentUser__name">{name}</h3>
    <p className="CurrentUser__email">{email}</p>
    <p className="CurrentUser__phone">{phone}</p>

    <button
      type="button"
      onClick={onClear}
    >
      Clear
    </button>
  </div>
);

CurrentUser.propTypes = CurrentUserType;

CurrentUser.defaultProps = {
  id: 0,
  name: '',
  email: '',
  phone: '',
};
