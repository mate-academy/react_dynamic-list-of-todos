import React, { useState, useEffect } from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';
import { getUser } from '../../helpers/api';

export const CurrentUser = ({
  userId,
  selectedUserId,
  setSelectedUser,
}) => {
  const [user, setUser] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const loadData = async() => {
    try {
      const todosFromServer = await getUser(selectedUserId);

      setUser(todosFromServer.data);
    } catch (error) {
      setErrorMessage('Loading error');
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="CurrentUser">
      <h2 className="CurrentUser__title">
        <span>
          {`Selected user: ${userId}`}
        </span>
      </h2>
      {errorMessage && <span className="error">{errorMessage}</span>}

      <h3 className="CurrentUser__name">{user.name}</h3>
      <p className="CurrentUser__email">{user.email}</p>
      <p className="CurrentUser__phone">{user.phone}</p>

      <button
        type="button"
        className="CurrentUser__clear"
        onClick={() => {
          setUser('');

          setSelectedUser('');
        }}
      >
        Clear
      </button>
    </div>
  );
};

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  setSelectedUser: PropTypes.func.isRequired,
};
