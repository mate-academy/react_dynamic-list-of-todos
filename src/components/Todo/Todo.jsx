import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { todoPropTypesShape } from '../../propTypesShapes/todoPropTypesShape';

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
      className={classNames('TodoList__item', {
        'TodoList__item--checked': completed,
        'TodoList__item--unchecked': !completed,
      })}
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
  ...todoPropTypesShape,
  selectedTodoId: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};
