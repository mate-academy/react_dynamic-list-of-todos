import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';

export const CurrentUser = ({ id, name, email, phone, clearUserID }) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title">
      <span>
        Selected user:
        { ' ' }
        { id }
      </span>
    </h2>

    <h3 className="CurrentUser__name">{ name }</h3>
    <p className="CurrentUser__email">{ email }</p>
    <p className="CurrentUser__phone">{ phone }</p>

    <button
      className="CurrentUser__clear button"
      type="button"
      onClick={clearUserID}
    >
      Clear
    </button>
  </div>
);

CurrentUser.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  clearUserID: PropTypes.func.isRequired,
};
