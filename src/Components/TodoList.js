import React from 'react';
import PropTypes from 'prop-types';

import User from './User';

function TodoList({ usersData }) {
  return (
    <table className="todo-list-table">
      <thead>
        <tr className="todo-list-table__titles">
          <th data-sort-type="id" data-column="0">№</th>
          <th data-sort-type="name" data-column="1">Name</th>
          <th data-sort-type="email" data-column="2">E-mail</th>
          <th data-sort-type="phone" data-column="3">Phone</th>
          <th data-sort-type="items" data-column="4">Tasks</th>
        </tr>
      </thead>
      <tbody className="todo-list-table__users">
        <User users={usersData} />
      </tbody>
    </table>
  );
}

TodoList.propTypes = {
  usersData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
