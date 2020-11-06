import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TodoPropType } from '../PropTypes/TodoPropType';

export const Todo = ({ todo, selectUser, selectedUserId }) => {
  const { id, title, completed, userId } = todo;

  return (
    <li
      key={id}
      className={classNames('TodoList__item',
        {
          'TodoList__item--unchecked': !completed,
          'TodoList__item--checked': completed,
        })}
    >

      <label>
        <input type="checkbox" checked={completed} readOnly />
        <p>{title}</p>
      </label>

      <button
        type="button"
        className={classNames('button TodoList__user-button', {
          'TodoList__user-button--selected':
            userId === selectedUserId,
        })}
        onClick={() => selectUser(userId)}
      >
        {`UserID #${userId}`}
      </button>
    </li>
  );
};

Todo.propTypes = {
  todo: TodoPropType.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};
