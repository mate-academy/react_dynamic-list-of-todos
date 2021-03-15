import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

export const CurrentUser = ({ users, userId, clearUser }) => (
  <div className="CurrentUser">
    {users.map(user => (user.id === userId ? (
      <>
        <h2 className="CurrentUser__title">
          <span>{`Selected user: ${user.id}`}</span>
        </h2>
        <h3 className="CurrentUser__name">{user.name}</h3>
        <p className="CurrentUser__email">{user.email}</p>
        <p className="CurrentUser__phone">{user.phone}</p>
        <button
          type="button"
          className="CurrentUser__clear"
          onClick={() => {
            clearUser(0);
          }}
        >
          Clear
        </button>
      </>
    ) : null))}
  </div>
);

CurrentUser.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }),
  ),
  userId: PropTypes.number.isRequired,
  clearUser: PropTypes.func.isRequired,
};

CurrentUser.defaultProps = {
  users: [],
};
