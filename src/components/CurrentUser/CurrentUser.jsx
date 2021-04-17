import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

export const CurrentUser = ({ user, deselectUser }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {user.id}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>
      <button
        type="button"
        className="CurrentUser__clear"
        onClick={deselectUser}
      >
        Clear
      </button>
    </div>
  );
};

const UserType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
});

CurrentUser.propTypes = {
  user: UserType.isRequired,
  deselectUser: PropTypes.func.isRequired,
};
