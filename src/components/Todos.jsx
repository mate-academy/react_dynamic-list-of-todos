import React from 'react';
import PropTypes from 'prop-types';

const Todos = ({ todoItem }) => (
  <div className="todo-item">
    <div>{todoItem.title}</div>
    <input
      className="checkbox"
      type="checkbox"
      defaultChecked={todoItem.completed}
    />
  </div>
);

Todos.propTypes = {
  todoItem: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object])).isRequired,
};

export default Todos;
