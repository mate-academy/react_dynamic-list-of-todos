import React from 'react';

export const CurrentUser = ({ user, onClear }) => (
  <div className="CurrentUser">
    <h2>Selected user: {user.id}</h2>
    <ul>
      <li>{user.name}</li>
      <li>{user.email}</li>
      <li>{user.phone}</li>
    </ul>
    <button
      type="button"
      onClick={onClear}
    >
      Clear
    </button>
  </div>
)

