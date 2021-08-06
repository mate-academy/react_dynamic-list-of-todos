import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({ todos, chooseUser }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
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
              onClick={() => chooseUser(todo.userId)}
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
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }).isRequired,
  ).isRequired,
  chooseUser: PropTypes.func.isRequired,
};
