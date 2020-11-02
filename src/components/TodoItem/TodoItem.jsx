import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TodoShape } from '../shapes/TodoShape';

export const TodoItem = ({ todo, selectedTodoId, selectUser, searchValue }) => {
  const { id, userId, completed, title } = todo;

  const isShown = title.toLowerCase().includes(searchValue);

  if (!isShown) {
    return null;
  }

  return (
    <li
      className={classNames('TodoList__item', {
        'TodoList__item--checked': completed,
        'TodoList__item--unchecked': !completed,
      })}
    >
      <label>
        <input type="checkbox" readOnly />
        <p>{title}</p>
      </label>

      <button
        type="button"
        className={classNames('TodoList__user-button', 'button', {
          'TodoList__user-button--selected': id === selectedTodoId,
        })}
        onClick={() => selectUser(userId, id)}
      >
        User&nbsp;#
        {userId}
      </button>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.shape(TodoShape).isRequired,
  selectedTodoId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
};
