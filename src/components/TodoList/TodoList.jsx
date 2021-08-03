import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  onClick,
  chooseStatus,
  value,
  chooseTitle,
  status,

}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <p>Title:</p>
    <input
      className="input"
      value={value}
      onChange={chooseTitle}
      placeholder="Type here"
    />
    <p>Status:</p>
    <select
      value={status}
      onChange={chooseStatus}
    >
      <option value="all">
        all
      </option>
      <option value="in process">
        active
      </option>
      <option value="completed">
        completed
      </option>
    </select>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames('TodoList__item', {
              'TodoList__item--unchecked': todo.completed,
              'TodoList__item--checked': !todo.completed,
            })}
          >
            <label>
              <input type="checkbox" readOnly />
              <p>{todo.title}</p>
            </label>

            <button
              className="TodoList__user-button button"
              type="button"
              onClick={() => onClick(todo.userId)}
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
      userId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  onClick: PropTypes.func.isRequired,
  chooseStatus: PropTypes.func.isRequired,
  chooseTitle: PropTypes.func.isRequired,
  status: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
