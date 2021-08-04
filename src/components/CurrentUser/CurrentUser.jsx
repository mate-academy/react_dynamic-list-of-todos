import React from 'react';
import './CurrentUser.scss';
import PropTypes from 'prop-types';

export const CurrentUser = ({ userId, currentUser, clearSelect }) => (

  <div className="CurrentUser">
    <h2 className="CurrentUser__title">
      <span>
        Selected user:&nbsp;
        {userId}
      </span>
    </h2>
    {currentUser && (
      <>
        <h3 className="CurrentUser__name">{currentUser.name}</h3>
        <p className="CurrentUser__email">{currentUser.email}</p>
        <p className="CurrentUser__phone">{currentUser.phone}</p>
      </>
    )}
    <button
      type="button"
      onClick={clearSelect}
    >
      Clear
    </button>
  </div>
);

CurrentUser.propTypes = {
  userId: PropTypes.number.isRequired,
  clearSelect: PropTypes.func.isRequired,
  currentUser: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
};
