import React from 'react';
import PropTypes from 'prop-types';

function TodoItem({ todo }) {
  return (
    <tr>
      <td>{todo.title}</td>
      <td><a href={`mailto:${todo.user.email}`}>{todo.user.name}</a></td>
      <td>{todo.completed ? 'complite' : 'in progress'}</td>
    </tr>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    user: PropTypes.shape({
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TodoItem;
