import React from 'react';
import PropTypes from 'prop-types';

const User = ({ currentUser }) => (
  <td className="todo-list-table__user-info">
    <span>{ currentUser.name }</span>
    <span>{ currentUser.email }</span>
    <span>{ currentUser.phone }</span>
  </td>
);

User.propTypes = {
  currentUser: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default User;
