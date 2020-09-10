import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({ todos, userDeteil }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <ul className="TodoList__list">

      {todos.map(todo => (
        <li
          key={todo.id}
          className={`TodoList__item ${todo.completed
            && 'TodoList__item--completed'}`}
        >
          <label
            className="TodoList__label"
          >
            <span className="TodoList__head">ID:</span>
            <span className="TodoList__text">{todo.id}</span>
            <input
              className="TodoList__checkbox"
              type="checkbox"
              checked={todo.completed && true}
              onChange={() => todo.completed}
            />
          </label>

          <div
            className="TodoList__user"
          >
            <span className="TodoList__head">User ID:</span>
            <span className="TodoList__text">{todo.userId}</span>
          </div>

          <p
            className="TodoList__title"
          >
            <span className="TodoList__head">Title:</span>
            <span className="TodoList__text">{todo.title}</span>
          </p>

          <button
            type="button"
            className="TodoList__button"
            value={+todo.userId}
            onClick={userDeteil}
          >
            User&nbsp;#1
          </button>
        </li>
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  userDeteil: PropTypes.func.isRequired,
};
