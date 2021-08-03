import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

export function Todo({ todo, selectedUserId, selectUser }) {
  return (
    <li className={classNames('TodoList__item', {
      'TodoList__item--unchecked': !todo.completed,
      'TodoList__item--checked': todo.completed,
    })}
    >
      <label>
        <input
          type="checkbox"
          readOnly
          checked={todo.completed}
        />
        <p>{todo.title}</p>
      </label>

      <button
        className={classNames('TodoList__user-button', 'button', {
          'TodoList__user-button--selected': selectedUserId === todo.userId,
        })}
        type="button"
        onClick={() => selectUser(todo.userId)}
      >
        {`User #${todo.userId}`}
      </button>
    </li>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    completed: PropTypes.bool,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }),
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};

Todo.defaultProps = {
  todo: {
    completed: false,
  },
};
