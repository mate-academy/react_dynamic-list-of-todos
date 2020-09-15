import React from 'react';
import PropTypes from 'prop-types';

export const CurrentUser = ({ id, name, email, phone, clearInfo }) => (
  <div className="CurrentUser">
    <h2>
      Selected user:
      {id}
    </h2>

    <ul>
      <li>{name}</li>
      <li>{email}</li>
      {phone && <li>{phone}</li>}
    </ul>

    <button
      type="button"
      onClick={clearInfo}
    >
      Clear
    </button>
  </div>
);

CurrentUser.defaultProps = {
  phone: false,
};

CurrentUser.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string,
  clearInfo: PropTypes.func.isRequired,
};
