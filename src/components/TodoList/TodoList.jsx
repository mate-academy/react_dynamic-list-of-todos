import React from 'react';
import './TodoList.scss';
import { PropTypes } from 'prop-types';
import classNames from 'classnames';

export const TodoList = ({ todos, userId, handleClickUsers }) => (
  <div className="TodoList">
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames('TodoList__item', {
              'TodoList__item--checked': todo.completed,
              'TodoList__item--unchecked': !todo.completed,
            })}
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
              />
              <p>{todo.title}</p>
            </label>
            <button
              className={classNames('TodoList__user-button', 'button', {
                'TodoList__user-button--selected': userId !== todo.userId,
              })}
              type="button"
              onClick={() => handleClickUsers(todo.userId)}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  userId: PropTypes.number.isRequired,
  handleClickUsers: PropTypes.func.isRequired,
};
