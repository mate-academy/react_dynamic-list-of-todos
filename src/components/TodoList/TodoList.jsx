import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export const TodoList = ({
  todos,
  setUserId,
  setTitle,
  setStatus,
  changeStatus,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <select
      name="select"
      onChange={(event) => {
        setStatus(event.target.value);
      }}
    >
      <option value="All">
        All
      </option>

      <option value="completed">
        Completed
      </option>

      <option value="active">
        Active
      </option>
    </select>

    <input
      type="text"
      name="title"
      onChange={(event) => {
        setTitle(event.target.value);
      }}
    />

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames({
              TodoList__item: true,
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
          >
            <label>
              <input
                type="checkbox"
                readOnly
                checked={todo.completed}
                onChange={() => (
                  changeStatus(todo.id)
                )}
              />
              <p>{todo.title}</p>
            </label>

            <button
              className="button TodoList__user-button"
              type="button"
              onClick={() => (
                setUserId(todo.userId)
              )}
            >
              User&nbsp;
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
    }).isRequired,
  ).isRequired,
  setUserId: PropTypes.func.isRequired,
  setTitle: PropTypes.func.isRequired,
  setStatus: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
};
