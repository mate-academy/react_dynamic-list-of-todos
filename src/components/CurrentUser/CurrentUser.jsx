import React from 'react';
import PropTypes from 'prop-types';

export const CurrentUser = ({ user, handleClearButton }) => (
  <div className="CurrentUser">
    <h2>{`Selected user: ${user.id}`}</h2>
    <ul>
      <li>{user.name}</li>
      <li>{user.email}</li>
      <li>{user.phone}</li>
    </ul>
    <button
      type="button"
      onClick={handleClearButton}
    >
      Clear
    </button>
  </div>
);

CurrentUser.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  }).isRequired,
  handleClearButton: PropTypes.func.isRequired,
};
