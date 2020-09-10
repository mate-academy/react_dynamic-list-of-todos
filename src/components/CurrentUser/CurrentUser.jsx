import React from 'react';
import PropTypes from 'prop-types';

export const CurrentUser = ({ id, name, email, phone, clearUser }) => (
  <div className="CurrentUser">
    <h2>{`Selected user: ${id}`}</h2>

    <div>
      <p>{name}</p>
      <p>{email}</p>
      <p>{phone}</p>
      <button
        type="button"
        onClick={() => clearUser()}
      >
        Clear
      </button>
    </div>
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
