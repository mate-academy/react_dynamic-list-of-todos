import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({ todos }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        <li className="TodoList__item TodoList__item--checked">
          <label>
            <input type="checkbox" checked readOnly />
            <p>distinctio vitae autem nihil ut molestias quo</p>
          </label>

          <button
            className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
            type="button"
          >
            User&nbsp;#2
          </button>
        </li>
        {todos.map(todo => (
          <li
            className={`TodoList__item TodoList__item--${
              todo.completed ? 'checked' : 'unchecked'}`
            }
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

TodoList.defaultProps = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: 0,
      title: 'No title',
      completed: false,
    }),
  ),
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }).isRequired,
  ),
};
