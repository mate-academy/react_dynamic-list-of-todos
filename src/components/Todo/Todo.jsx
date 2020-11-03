import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TodoPropTypes } from '../propTypes/TodoPropTypes';

export const Todo = ({ todo, selectUser, selectedUserId }) => (
  <div
    className={classNames({
      TodoList__item: true,
      'TodoList__item--checked': todo.completed,
      'TodoList__item--unchecked': !todo.completed,
    })}
  >
    <label>
      <input type="checkbox" readOnly />
      <p>{todo.title}</p>
    </label>

    <button
      className={classNames({
        button: true,
        'TodoList__user-button': true,
        'TodoList__user-button--selected':
          selectedUserId === todo.userId,
      })}
      type="button"
      onClick={() => selectUser(todo.userId)}
    >
      {`User #${todo.userId}`}
    </button>
  </div>
);

Todo.propTypes = {
  todo: PropTypes.shape(TodoPropTypes).isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};
