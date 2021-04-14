import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

export const CurrentUser = ({ user, resetUser }) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title">
      <span>
        Selected user:&nbsp;#
        {user.id}
      </span>
    </h2>

    <h3 className="CurrentUser__name">{user.name}</h3>
    <p className="CurrentUser__email">{user.email}</p>
    <p className="CurrentUser__phone">{user.phone}</p>

    <button
      type="button"
      className="CurrentUser__clear"
      onClick={resetUser}
    >
      Clear
    </button>
  </div>
);

CurrentUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  resetUser: PropTypes.func.isRequired,
};
