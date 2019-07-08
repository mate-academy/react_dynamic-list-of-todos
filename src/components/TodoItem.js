import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

function TodoItem({ todo }) {
  return (
    <li className="todo-list_item">
      <label htmlFor={`todo-status-${todo.id}`}>
        <div>{todo.title}</div>
        <input
          type="checkbox"
          id={`todo-status-${todo.id}`}
          checked={todo.completed}
        />
      </label>

      <User user={todo.user} />
    </li>
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
