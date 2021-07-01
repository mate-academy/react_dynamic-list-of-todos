import React, { useEffect, useState } from 'react';

import './CurrentUser.scss';

import PropTypes from 'prop-types';
import { getUser } from '../../api/users';

export const CurrentUser = ({ userId, userClear }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser(userId).then(setUser);
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>{`Selected user: ${userId}`}</span>
      </h2>

      {!user ? (
        <p>Loading...</p>
      ) : (
        <>
          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>
        </>
      )}

      <button
        onClick={userClear}
        type="button"
      >
        Clear
      </button>
    </div>
  );
};

CurrentUser.propTypes = {
  userClear: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
