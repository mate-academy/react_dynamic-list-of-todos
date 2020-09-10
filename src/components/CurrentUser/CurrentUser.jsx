import React from 'react';
import PropTypes from 'prop-types';

export const CurrentUser = ({ resetUser,
  id, name,
  email,
  phone,
  noUserError }) => (
  <div className="CurrentUser">
      {noUserError
      ? <span>No info about this user</span>
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
CurrentUser.defaultProps = {
  id: '',
  name: '',
  email: '',
  phone: '',
};
CurrentUser.propTypes = {
  resetUser: PropTypes.func.isRequired,
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  noUserError: PropTypes.bool.isRequired,
};
