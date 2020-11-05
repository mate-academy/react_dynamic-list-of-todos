import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export function Todo({
  completed,
  title,
  userId,
  id,
  selectedTodoId,
  handleChange,
}) {
  return (
    <li
      className={completed
        ? 'TodoList__item TodoList__item--checked'
        : 'TodoList__item TodoList__item--unchecked'}
    >
      <label>
        <input
          type="checkbox"
          readOnly
          checked={completed}
        />
        <p>{title}</p>
      </label>

      <button
        className={classNames('TodoList__user-button button', {
          'TodoList__user-button--selected': selectedTodoId === id,
        })}
        type="button"
        value={userId}
        onClick={(event) => {
          handleChange(event, id);
        }}
      >
        User&nbsp;#
        {userId}
      </button>

    </li>
  );
}

Todo.propTypes = {
  id: PropTypes.number.isRequired,
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  selectedTodoId: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};
