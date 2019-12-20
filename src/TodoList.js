import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoList = ({ todos, sortTodos }) => (
  <table>
    <thead>
      <tr>
        <th
          onClick={() => sortTodos('id')}
        >
          #id
        </th>
        <th
          onClick={() => sortTodos('user')}
        >
          user name
        </th>
        <th
          onClick={() => sortTodos('title')}
        >
          what need to be done
        </th>
        <th
          onClick={() => sortTodos('completed')}
        >
          completed or no
        </th>
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

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortTodos: PropTypes.func.isRequired,
};

export default TodoList;
