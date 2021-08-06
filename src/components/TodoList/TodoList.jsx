import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({ todos, onClick }) => (
  <div className="TodoList">
    <h2>{`Todos: ${todos.length}`}</h2>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            className={`
            TodoList__item
            TodoList__item${todo.completed
              ? '--checked'
              : '--unchecked'}`
            }
            key={todo.id}
          >
            <label>
              <input type="checkbox" checked={todo.completed} readOnly />
              <p>{todo.title}</p>
            </label>
            <button
              className="TodoList__user-button--selected button"
              type="button"
              name={todo.userId}
              onClick={onClick}
            >
              {`User ${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    userId: PropTypes.number,
  })).isRequired,
  onClick: PropTypes.func.isRequired,
};
