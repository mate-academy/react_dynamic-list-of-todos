import React from 'react';
import propTypes from 'prop-types';

const User = ({ user }) => (
  <ul className="todo-item__user">
    <li>
      Name:
      {user.name}
    </li>
    <li>
      Username:
      {user.username}
    </li>
    <li>
      Email:
      {user.email}
    </li>
    <li>
      Website:
      <a href={user.website}>{user.website}</a>
    </li>
    <li>
      Address:
      {user.address.city}
    </li>
    <li>
      Company:
      {user.company.name}
    </li>
  </ul>
);

User.propTypes = {
  user: propTypes.shape({
    name: propTypes.string,
    username: propTypes.string,
    email: propTypes.string,
    website: propTypes.string,
    address: propTypes.object,
    company: propTypes.object,
  }).isRequired,
};

export default User;
