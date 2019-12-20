import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <div className="todo">
    <p className="todo__title">{todo.title}</p>
    <p className="todo__user">
      User:
      {' '}
      {todo.user.name}
    </p>
    {todo.completed
      ? (
        <p className="todo__status">Completed</p>
      )
      : (
        <p className="todo__status">Not completed</p>
      )}
    <hr className="todo__line" />
  </div>
);

TodoItem.propTypes = {
  todo: PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default TodoItem;
