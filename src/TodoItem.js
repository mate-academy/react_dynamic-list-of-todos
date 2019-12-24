import React from 'react';
import PropTypes from 'prop-types';

const TodoItem = ({ todo }) => (
  <div>
    <p>{todo.title}</p>
    <p>
      User:
      {' '}
      {todo.user.name}
    </p>
    {todo.completed
      ? (
        <p>Completed</p>
      )
      : (
        <p>Not completed</p>
      )}
    <hr />
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
