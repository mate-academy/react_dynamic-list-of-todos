import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const Todo = ({ todos, handleUser, selectedUserId }) => (
  <div className="TodoList__list-container">
    <ul className="TodoList__list">
      {todos.map(todo => (
        <li
          key={todo.id}
          className={
            `TodoList__item TodoList__item--${
              todo.completed
                ? 'checked'
                : 'unchecked'
            }`
          }
        >
          <label>
            <input type="checkbox" checked={todo.completed} readOnly />
            <p>{todo.title}</p>
          </label>

          <button
            className={classNames({
              'TodoList__user-button': true,
              'TodoList__user-button--selected': selectedUserId === todo.userId,
              button: true,
            })}

            value={todo.userId}
            type="button"
            onClick={handleUser}
          >
            {`User #${todo.userId}`}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export const shapeTodo = {
  selectedUserId: PropTypes.number.isRequired,
  handleUser: PropTypes.func.isRequired,
  todos: PropTypes.arrayOf({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  }).isRequired,
}.isRequired;

Todo.propTypes = shapeTodo;
