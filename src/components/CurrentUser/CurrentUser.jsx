import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';

export const CurrentUser = ({ id, name, email, phone, onClear }) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title">
      <span>
        Selected user:
        {id}
      </span>
    </h2>

    <h3 className="CurrentUser__name">{name}</h3>
    <p className="CurrentUser__email">{email}</p>
    <p className="CurrentUser__phone">{phone}</p>
    <button
      type="button"
      onClick={onClear}
    >
      Clear
    </button>
  </div>
);

CurrentUser.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  phone: PropTypes.string,
  onClear: PropTypes.func.isRequired,
};

CurrentUser.defaultProps = {
  id: 0,
  name: '',
  email: '',
  phone: '',
};
