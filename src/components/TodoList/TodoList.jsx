import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({ todos, onSelected }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={!todo.completed
              ? 'TodoList__item TodoList__item--unchecked'
              : 'TodoList__item TodoList__item--checked'
            }
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
              className={classNames('TodoList__user-button', 'button', {
                'TodoList__user-button--selected': todo.completed,
              })}
              type="button"
              onClick={() => {
                onSelected(todo.userId);
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      userId: PropTypes.number,
      completed: PropTypes.bool,
      title: PropTypes.string,
    }),
  ),
  onSelected: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
