import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { hideUser } from '../../store/selectUser';
import { getUser } from '../../api/api';
import './CurrentUser.scss';

export const CurrentUser = () => {
  const dispatch = useDispatch();
  const currentUserId = useSelector(state => state.userReducer.user);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const handleUser = async() => {
      const userFromServer = await getUser(currentUserId);

      setCurrentUser(userFromServer);
    };

    handleUser();
  }, [currentUserId]);

  return (
    currentUser && (
      <div className="CurrentUser">
        <h2 className="CurrentUser__title">
          <span>
            Selected user:
            {' '}
            {currentUser.userId}
          </span>
        </h2>

        <h3 className="CurrentUser__name">{currentUser.name}</h3>
        <p className="CurrentUser__email">{currentUser.email}</p>
        <p className="CurrentUser__phone">{currentUser.phone}</p>

        <button
          onClick={() => dispatch(hideUser())}
          type="button"
          className="CurrentUser__clear"
        >
          clear
        </button>
      </div>
    )
  );
};
