import React from 'react';
import './Todo.scss';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

import { TodoShape } from '../shapes/TodoShape';

export const Todo = ({ todo, handleUserSelect, selectedTodoId }) => {
  const { id, title, completed, userId } = todo;

  return (
    <li
      className={ClassNames('Todo', {
        'Todo--checked': completed,
        'Todo--unchecked': !completed,
      })}
    >
      <label>
        <input
          type="checkbox"
          checked={completed}
          readOnly
        />
        <p>{title}</p>
      </label>

      <button
        className={ClassNames(
          'button',
          { 'Todo__user-button--selected': selectedTodoId === id },
        )}
        type="button"
        onClick={() => handleUserSelect(userId, id)}
      >
        {`User #${userId}`}
      </button>
    </li>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape(TodoShape).isRequired,
  handleUserSelect: PropTypes.func.isRequired,
  selectedTodoId: PropTypes.number.isRequired,
};
