import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

const User = ({ users }) => (
  users.map(currentUser => (
    <tr>
      <td>{ currentUser.id }</td>
      <td>{ currentUser.name }</td>
      <td>{ currentUser.email }</td>
      <td>{ currentUser.phone }</td>
      <TodoItem todo={currentUser.todo} />
    </tr>
  )));

User.propTypes = {
  users: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default User;
