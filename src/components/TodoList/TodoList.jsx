import React from 'react';
import { todoListPropTypes } from '../../utils';
import './TodoList.scss';

export const TodoList = ({ todos, onClick }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map((todo) => {
          const { id, title, userId, completed } = todo;

          return (
            <li
              key={id}
              className={'TodoList__item'
                + ` TodoList__item--${completed ? 'checked' : 'unchecked'}`
              }
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                />
                <p>{title}</p>
              </label>
              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={onClick}
                name="selectedUserId"
                value={userId}
              >
                {`User ${userId}`}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = todoListPropTypes;
