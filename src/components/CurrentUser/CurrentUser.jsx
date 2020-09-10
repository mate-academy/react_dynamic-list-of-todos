import React from 'react';
import PropTypes from 'prop-types';

export const CurrentUser = ({ id, name, email, phone, clearUser }) => (
  <div className="CurrentUser">
    <h2>{`Selected user: ${id}`}</h2>

    <ul>
      <li>{name}</li>
      <li>{email}</li>
      <li>{phone}</li>
      <button
        type="button"
        onClick={() => clearUser()}
      >
        Clear
      </button>
    </ul>
  </div>
);

CurrentUser.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  clearUser: PropTypes.func.isRequired,
};

CurrentUser.defaultProps = {
  id: 0,
  name: '',
  email: '',
  phone: '',
};
