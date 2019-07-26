import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({ todo }) => (
  <tr>
    <td>{todo.id}</td>
    <td>{todo.completed ? '+' : '-' }</td>
    <td>{todo.title}</td>
    <User todo={todo} key={todo.id} />
  </tr>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TodoItem;
