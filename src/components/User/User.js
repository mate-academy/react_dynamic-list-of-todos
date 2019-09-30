import React from 'react';
import './User.css';

const User = ({ name }) => (
  <div className="item-user">
    <span className="item-user--name">Assigned to: </span>
    { name }
  </div>
);

export default User;
