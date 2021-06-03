import React from 'react';
import './TodoList.scss';
import PropTypes, { string } from 'prop-types';

export const TodoList = ({ todos, userSelect, userSelected }) => (
  <div className="TodoList">
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            className={
              todo.completed
                ? 'TodoList__item TodoList__item--checked'
                : 'TodoList__item TodoList__item--unchecked'
            }
            key={todo.id}
          >
            <label>
              <input type="checkbox" readOnly />
              <p>{todo.title}</p>
            </label>
            <button
              className={
                todo.userId === userSelected
                  ? `
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    `
                  : 'TodoList__user-button button'
              }
              type="button"
              onClick={() => {
                userSelect(todo.userId);
              }}
            >
              User&nbsp;#
              {todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(string).isRequired,
  userSelect: PropTypes.func.isRequired,
  userSelected: PropTypes.func.isRequired,
};
