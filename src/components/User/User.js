import React from 'react';

function User({user}) {
  return (
    <div className="user-info">
        <div role="listitem" className="item">
          <i aria-hidden="true" className="users icon"></i>
          <div className="content">
        {user.name}
          </div>
        </div>
      <div role="listitem" className="item">
        <i aria-hidden="true" className="mail icon"></i>
        <div className="content">
          <a href={'mailto:${user.email}'}>{user.email}</a>
        </div>
      </div>
      <p>{user.phone}</p>
      <a href={'${user.website}'}>{user.website}</a>
    </div>
  );
}

export default User;
