import React from 'react';
import './CurrentUser.scss';

export const CurrentUser = ({ user, clearUser }) => (

  <div className="CurrentUser">
    <h2 className="CurrentUser__title"><span>Selected user: {user.id}</span></h2>

    <h3 className="CurrentUser__name">{user.name}</h3>
    <p className="CurrentUser__email">{user.email}</p>
    <p className="CurrentUser__phone">{user.phone}</p>
    <button
      type="button"
      onClick={() => clearUser()}
    >
      Clear
    </button>
  </div>
);
