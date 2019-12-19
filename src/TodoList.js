import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoList = ({ todos }) => (
  <table>
    <thead>
      <tr>
        <th>#id</th>
        <th>user name</th>
        <th>what need to be done</th>
        <th>completed or no</th>
      </tr>
    </thead>
    <tbody>
      { todos.map(({ id, user, title, completed }) => (
        <tr key={id}>
          <td>{id}</td>
          <User user={user} />
          <td>{title}</td>
          <td>{completed ? 'completed' : 'no completed' }</td>
        </tr>
      )) }
    </tbody>
  </table>
);

TodoList.propTypes = { todos: PropTypes.arrayOf(PropTypes.object).isRequired };

export default TodoList;
