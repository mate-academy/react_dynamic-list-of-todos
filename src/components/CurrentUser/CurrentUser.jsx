import React from 'react';
import PropTypes from 'prop-types';
import './CurrentUser.scss';

export const CurrentUser = ({ userId, user, clearUser }) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title"><span>Selected user: {userId}</span></h2>
    <h3 className="CurrentUser__name">{user.name}</h3>
    <p className="CurrentUser__email">{user.email}</p>
    <p className="CurrentUser__phone">{user.phone}</p>
    <button
      class="CurrentUser__button button"
      onClick={() => clearUser()}
    ><span>Clear</span></button>
  </div>
);

CurrentUser.propTypes = {
  user: PropTypes.object.isRequired,
}