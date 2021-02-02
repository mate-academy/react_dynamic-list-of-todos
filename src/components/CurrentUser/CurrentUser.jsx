import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

export const CurrentUser = ({ clearData, userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const handleUser = async() => {
      const userFromServer = await getUser(userId);

      setUser(userFromServer);
    };

    handleUser();
  }, [userId]);

  return (
    user
      && (
        <div className="CurrentUser">
          <h2 className="CurrentUser__title">
            <span>
              Selected user:
              {' '}
              {user.id}
            </span>
          </h2>

          <h3 className="CurrentUser__name">{user.name}</h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>

          <button
            onClick={clearData}
            type="button"
            className="CurrentUser__clear"
          >
            clear
          </button>
        </div>
      )
  );
};

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearData: PropTypes.func.isRequired,
};
