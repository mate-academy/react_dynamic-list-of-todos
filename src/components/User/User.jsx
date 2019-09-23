import React from 'react';
import './User.scss';
import { UserProps } from '../../constants/PropTypes';

function User({
  name, username, email, completed,
}) {
  return (
    <div className={`user-item${completed ? ' green' : ' red'}`}>
      <p className="user-item__name">{name}</p>
      <h2 className="user-item__username">{username}</h2>
      <p className="user-item__mail">{email}</p>
    </div>
  );
}

User.propTypes = UserProps;

export default User;
