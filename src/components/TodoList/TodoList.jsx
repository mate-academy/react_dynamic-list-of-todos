import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({ todos, selectUser }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            // eslint-disable-next-line
            className={`TodoList__item TodoList__item--${todo.completed ? 'checked' : 'unchecked'}`}
          >
            <label>
              {todo.completed ? (
                <input
                  type="checkbox"
                  checked
                  readOnly
                />
              ) : (
                <input
                  type="checkbox"
                  readOnly
                  onChange={(event) => {
                    selectUser(todo.userId, event);
                  }}
                />
              )}
              <p>{todo.title}</p>
            </label>

            <button
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              type="button"
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
};
