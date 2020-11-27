import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../api/api';

export const CurrentUser = ({ selectedUserId, chooseUserId }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async() => {
      const result = await getUser(selectedUserId);

      setUser(result);
    };

    fetchUser();
  }, [selectedUserId]);

  return (
    <div className="CurrentUser">
      {user !== null
        ? (
          <>
            <h2 className="CurrentUser__title">
              <span>
                {`Selected user:${user.id}`}
              </span>
            </h2>

            <h3 className="CurrentUser__name">{user.name}</h3>
            <p className="CurrentUser__email">{user.email}</p>
            <p className="CurrentUser__phone">{user.phone}</p>
            <button
              className="randomize"
              type="button"
              onClick={() => chooseUserId(0)}
            >
              Clear user details!
            </button>
          </>
        )
        : 'We do not have information about this user'}
    </div>
  );
};

CurrentUser.propTypes = {
  selectedUserId: PropTypes.number.isRequired,
  chooseUserId: PropTypes.func.isRequired,
};
