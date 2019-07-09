import React from 'react';
import PropTypes from 'prop-types';

const Todos = ({ todoItem }) => (
  <li className="todo-item">
    <div>{todoItem.title}</div>
    <input
      className="checkbox"
      type="checkbox"
      defaultChecked={todoItem.completed}
    />
  </li>
);

Todos.propTypes = {
  todoItem: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
};

export default Todos;
