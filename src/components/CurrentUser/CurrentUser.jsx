import React from 'react';
import PropTypes from 'prop-types';

export const CurrentUser = ({ resetUser,
  id, name,
  email,
  phone,
  noUserError }) => (
  <div className="CurrentUser">
      {noUserError
      ? <p>No info about this user</p>
      : (
        <>
          <h2>
            Selected user:
            {id}
          </h2>
          <ul>
            <li>{name}</li>
            <li>{email}</li>
            <li>{phone}</li>
          </ul>
          <button type="button" onClick={resetUser}>Clear</button>
        </>
      )
    }
  </div>
);

CurrentUser.propTypes = {
  resetUser: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  noUserError: PropTypes.bool.isRequired,
};
