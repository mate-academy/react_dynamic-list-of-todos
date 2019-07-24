import React from 'react';
import PropTypes from 'prop-types';

function TodoItem({ todo }) {
  return (
    <tr>
      <td>{todo.id}</td>
      <td>{todo.completed ? '✔' : ''}</td>
      <td className="todo-list_item_title">{todo.title}</td>
      <td>{todo.user.name}</td>
    </tr>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    user: PropTypes.object,
    completed: PropTypes.bool,
    id: PropTypes.number,
  }).isRequired,
};

export default TodoItem;
