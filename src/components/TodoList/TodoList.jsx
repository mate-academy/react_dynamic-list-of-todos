import React from 'react';
import './TodoList.scss';
import { TodoListProps, TodoListDefaultProps } from '../props/TodoListProps'
export const TodoList = ({ todos, getCurrentUserId, selectedUserId }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            className={
              `TodoList__item TodoList__item--${todo.completed
                ? 'checked' : 'unchecked'
              }`
            }
            key={todo.id}
          >
            <label key={todo.title}>
              {
                todo.completed
                  ? <input type="checkbox" readOnly checked />
                  : <input type="checkbox" readOnly />
              }
              <p>{todo.title}</p>
            </label>

            <button
              className={
                `TodoList__user-button${
                  selectedUserId === todo.userId
                  ? ' TodoList__user-button--selected button'
                  : ' button'
                }`
              }
              type="button"
              key={todo.userId}
              onClick={() => getCurrentUserId(todo.userId)}
            >
              UserId #
              {todo.userId}
            </button>
          </li>
        ))}

      </ul>
    </div>
  </div>
);

TodoList.propTypes = TodoListProps;
TodoList.defaultProps = TodoListDefaultProps;
