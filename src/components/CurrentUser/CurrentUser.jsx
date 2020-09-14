import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../api/api';

export const CurrentUser = ({ userId, userClear }) => {
  const [selectUser, setSelectUser] = useState({});

  useEffect(() => {
    debugger;
    getUser(userId)
      .then(users => setSelectUser(users.data));
  }, [userId]);

  const { name, email, phone } = selectUser;

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          Selected user:
          {userId}
        </span>
      </h2>

      <h3 className="CurrentUser__name">{name}</h3>
      <p className="CurrentUser__email">{email}</p>
      <p className="CurrentUser__phone">{phone}</p>
      <button
        type="button"
        className="button CurrentUser__clear"
        onClick={userClear}
      >
        Clear
      </button>
    </div>
  );
};

CurrentUser.propTypes = {
  userId: PropTypes.string.isRequired,
  userClear: PropTypes.func.isRequired,

};
