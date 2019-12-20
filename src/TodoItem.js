import React from 'react';
import PropTypes from 'prop-types';
import User from './User';

const TodoItem = ({ todo }) => (
  <ul className="todo_item">
    <li className="todo_item-id">{todo.id}</li>
    <li className="todo_item-title">{todo.title}</li>
    <li className="todo_item-status">{todo.completed ? 'true' : 'false'}</li>
    <User user={todo.user} />
  </ul>
);

TodoItem.propTypes = { todo: PropTypes.objectOf(PropTypes.any).isRequired };

export default TodoItem;
