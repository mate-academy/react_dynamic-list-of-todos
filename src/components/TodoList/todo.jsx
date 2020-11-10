import React from 'react';
import PropTypes from 'prop-types';

export function Todo({
  title,
  userId,
  completed,
  userSelect,
}) {
  return (
    <li
      className={completed
        ? 'TodoList__item TodoList__item--checked'
        : 'TodoList__item TodoList__item--unchecked'}
    >
      <label>
        {completed
          ? <input type="checkbox" checked readOnly />
          : <input type="checkbox" readOnly />
        }
        <p>{title}</p>
      </label>

      <button
        className="
          TodoList__user-button
          TodoList__user-button--selected
          button
        "
        type="button"
        onClick={() => userSelect(userId)}
      >
        User&nbsp;#
        {userId}
      </button>
    </li>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  userId: PropTypes.number,
  completed: PropTypes.bool,
  userSelect: PropTypes.func.isRequired,
};

Todo.defaultProps = {
  userId: 0,
  completed: false,
};
