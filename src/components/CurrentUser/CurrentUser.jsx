import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';

import './CurrentUser.scss';

import { getUser } from '../../api/api';

export const CurrentUser = ({ userId, clearUser }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    getUser(userId)
      .then(setUser);
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {' '}
          {userId}
        </span>
      </h2>

      {user && (
        <>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
          <button
            type="button"
            className="button"
            onClick={clearUser}
          >
            Clear
          </button>
        </>
      )}
    </div>
  );
};

CurrentUser.propTypes = {
  userId: propTypes.number.isRequired,
  clearUser: propTypes.func.isRequired,
};
