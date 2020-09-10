import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';
import * as todosAPI from '../../api/api';

export const CurrentUser = ({ userId, onSelectedUserClearance }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    todosAPI.getUsers(userId).then(userFromServer => setUser(userFromServer));
  }, [userId]);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${userId}`}
        </span>
      </h2>

      {user && (
        <div className="CurrentUser__container">
          <h3 className="CurrentUser__name">
            {user.name}
          </h3>
          <p className="CurrentUser__email">{user.email}</p>
          <p className="CurrentUser__phone">{user.phone}</p>

          <button
            type="button"
            className="button  CurrentUser__clear"
            onClick={() => {
              onSelectedUserClearance();
            }}
          >
            Clear current user
          </button>
        </div>
      )}
    </div>
  );
};

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  onSelectedUserClearance: PropTypes.func.isRequired,
};
