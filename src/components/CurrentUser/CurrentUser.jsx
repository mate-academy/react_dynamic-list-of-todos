import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

export const CurrentUser = ({ user, userId, clear }) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title">
      <span>{`Selected user: ${userId}`}</span>
    </h2>

    <h3 className="CurrentUser__name">{user.name}</h3>
    <p className="CurrentUser__email">{user.email}</p>
    <p className="CurrentUser__phone">{user.phone}</p>
    <button
      type="button"
      onClick={() => clear()}
      className="CurrentUser__button"
    >
      Clear
    </button>
  </div>
);

CurrentUser.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  userId: PropTypes.number.isRequired,
  clear: PropTypes.func.isRequired,
};
