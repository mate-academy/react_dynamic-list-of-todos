import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';

export function Todo({ todo, selectUser }) {
  return (
    <li className={classNames(
      'TodoList__item',
      { 'TodoList__item--unchecked': todo.completed },
      { 'TodoList__item--checked': !todo.completed },
    )}
    >
      <label>
        <input
          type="checkbox"
          readOnly
          checked={!todo.completed}

        />
        <p>{todo.title}</p>
      </label>
      <button
        type="button"
        className="
          TodoList__user-button
          TodoList__user-button--selected
          button
        "
        onClick={() => selectUser(todo.userId)}
      >
        User&nbsp;#
        {todo.userId}
      </button>
    </li>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
    title: PropTypes.string,
    updatedAt: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    userId: PropTypes.number,
  }).isRequired,
  selectUser: PropTypes.func.isRequired,
};
