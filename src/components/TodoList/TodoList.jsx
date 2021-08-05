import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({ todos, selectedTodo, selectedTodoId }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames(
              'TodoList__item',
              (todo.completed
                ? 'TodoList__item--unchecked'
                : 'TodoList__item--checked'
              ),
            )}
          >
            <label>
              <input type="checkbox" readOnly />
              <p>{todo.title}</p>
            </label>

            {selectedTodoId === todo.id ? (
              <button
                className="
                  TodoList__user-button
                  button
                  TodoList__user-button--selected
                "
                type="button"
                onClick={() => {
                  selectedTodo(0);
                }}
              >
                User&nbsp;
                {`#${todo.userId}`}
              </button>
            ) : (
              <button
                className="
                  TodoList__user-button
                  button
                  TodoList__user-button--unselected
                "
                type="button"
                onClick={() => {
                  selectedTodo(todo.id);
                }}
              >
                User&nbsp;
                {`#${todo.userId}`}
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      completed: PropTypes.bool,
    }),
  ).isRequired,
  selectedTodo: PropTypes.func.isRequired,
  selectedTodoId: PropTypes.number.isRequired,
};
