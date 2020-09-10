import React from 'react';
import PropTypes from 'prop-types';

export const CurrentUser = ({ users, userId, clearInfo }) => (
  <div className="CurrentUser">
    <h2>
      Selected user:
      {userId}
    </h2>

    <ul>
      <li>{users[userId - 1].name}</li>
      <li>{users[userId - 1].email}</li>
      <li>{users[userId - 1].phone}</li>
    </ul>

    <button
      type="button"
      onClick={clearInfo}
    >
      Clear
    </button>
  </div>
);

CurrentUser.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
  userId: PropTypes.string.isRequired,
  clearInfo: PropTypes.func.isRequired,
};
