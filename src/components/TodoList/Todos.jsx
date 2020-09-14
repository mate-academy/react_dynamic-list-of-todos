import React from 'react';
import PropTypes, { object } from 'prop-types';

export const Todos = ({ todos, selectUser, onToggleToDo }) => (
  <ul className="TodoList__list">
    {
      todos.map(todo => (
        <li
          key={todo.id}
          className={todo.completed
            ? 'TodoList__item TodoList__item--checked'
            : 'TodoList__item TodoList__item--unchecked'
          }

        >
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={event => onToggleToDo(event, todo.id)}
            />
            <p>{todo.title}</p>
          </label>

          <button
            className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
            type="button"
            onClick={() => selectUser(todo.userId)}
          >
            User&nbsp;#
            {
              todo.userId
            }
          </button>
        </li>
      ))
    }
  </ul>
);

Todos.propTypes = {
  todos: PropTypes.arrayOf(object).isRequired,
  selectUser: PropTypes.func.isRequired,
  onToggleToDo: PropTypes.func.isRequired,
};
