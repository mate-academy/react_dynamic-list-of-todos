import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({ todos, getCurrentUserId, selectedUserId }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li className={
            todo.completed
              ? 'TodoList__item TodoList__item--checked'
              : 'TodoList__item TodoList__item--unchecked'
          }
          >
            <label>
              {
                todo.completed
                  ? <input type="checkbox" readOnly checked />
                  : <input type="checkbox" readOnly />
              }
              <p>{todo.title}</p>
            </label>

            <button
              className={
                selectedUserId === todo.userId
                  // eslint-disable-next-line max-len
                  ? 'TodoList__user-button TodoList__user-button--selected button'
                  : 'TodoList__user-button button'
              }
              type="button"
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

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  })).isRequired,
  getCurrentUserId: PropTypes.func.isRequired,
  selectedUserId: PropTypes.string.isRequired,
};
