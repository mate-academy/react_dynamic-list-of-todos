import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { TodoType } from '../../types';

export const Todo = ({ todo, selectedUserId, onUserSelect }) => (
  <>
    <label>
      <input
        type="checkbox"
        checked={todo.completed}
        readOnly
      />
      <p>{todo.title}</p>
    </label>
    <button
      className={classnames(
        'TodoList__user-button',
        'button',
        {
          'TodoList__user-button--selected': todo.userId === selectedUserId,
        },
      )}
      type="button"
      onClick={() => {
        if (todo.userId !== selectedUserId) {
          onUserSelect(todo.userId);
        }
      }}
    >
      User&nbsp;#
      {todo.userId}
    </button>
  </>
);

Todo.propTypes = {
  todo: TodoType.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  onUserSelect: PropTypes.func.isRequired,
};
