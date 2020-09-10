import React from 'react';
import './CurrentUser.scss';

export const CurrentUser = ({ id, name, email, phone, clearedUser }) => (
  <div className="CurrentUser">
    <h2 className="CurrentUser__title">
      <span>{`Selected user: ${id}`}</span>
    </h2>

    <h3 className="CurrentUser__name">{name}</h3>
    <p className="CurrentUser__email">{email}</p>
    <p className="CurrentUser__phone">{phone}</p>

    <button
      className="CurrentUser__clear"
      type="button"
      onClick={() => {
        clearedUser();
      }}
    >
      Clear
    </button>
  </div>
);
