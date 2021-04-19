import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';
import propTypes from 'prop-types';
import { todoShape } from '../../shapes/shapes';

export const TodoList = ({ todos, selectUser }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            className={classNames('TodoList__item', {
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
            key={todo.id}
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
              className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
              type="button"
              onClick={() => {
                selectUser(todo.userId);
              }}
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
  todos: propTypes.arrayOf(
    propTypes.shape(todoShape),
  ).isRequired,
  selectUser: propTypes.func.isRequired,
};
