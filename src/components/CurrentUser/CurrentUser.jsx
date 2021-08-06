import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';

export const CurrentUser = ({ user, onClick }) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title">
      <span>
        {`Selected user: ${user.id}`}
      </span>
    </h2>

    <h3 className="CurrentUser__name">{user.name}</h3>
    <p className="CurrentUser__email">{user.email}</p>
    <p className="CurrentUser__phone">{user.phone}</p>
    <button
      type="button"
      onClick={onClick}
      className="button-clear"
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
  onClick: PropTypes.func.isRequired,
};
