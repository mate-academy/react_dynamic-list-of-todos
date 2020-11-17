import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const Todo = ({ todo, selectedUserId, selectUser, handleChecked }) => (
  <>
    <label>
      <input
        type="checkbox"
        checked={todo.completed}
        readOnly
        onChange={() => handleChecked(todo.id)}
      />
      <p>{todo.title}</p>
    </label>

    <button
      className={classNames(
        'button',
        'TodoList__user-button',
        {
          'TodoList__user-button--selected': selectedUserId === todo.userId,
        },
      )}
      type="button"
      onClick={() => selectUser(todo.userId)}
    >
      {`User #${todo.userId}`}
    </button>
  </>
);

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    completed: PropTypes.bool,
    title: PropTypes.string.isRequired,
  }).isRequired,
  selectedUserId: PropTypes.number,
  selectUser: PropTypes.func.isRequired,
  handleChecked: PropTypes.func.isRequired,
};

Todo.defaultProps = {
  selectedUserId: PropTypes.null,
};
