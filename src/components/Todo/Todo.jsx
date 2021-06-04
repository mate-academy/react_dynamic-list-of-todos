import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const Todo = ({
  todo,
  selectUser,
  userId,
}) => (
  <>
    <label>
      {todo.completed ? (
        <input type="checkbox" checked readOnly />
      ) : (
        <input type="checkbox" disabled />
      )}

      <p>{todo.title}</p>
    </label>
    <button
      className={classNames('button TodoList__user-button', {
        // eslint-disable-next-line
        'TodoList__user-button--selected': todo.userId === userId,
      })}
      type="button"
      onClick={() => {
        selectUser(todo.userId);
      }}
    >
      User #
      {todo.userId}
    </button>
  </>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
  selectUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
