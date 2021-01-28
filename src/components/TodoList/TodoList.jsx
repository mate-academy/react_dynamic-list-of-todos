import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  selectUser,
  toCheck,
  toSearch,
  toSelect,
  toShuffle,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__filters">
      <label className="TodoList__label">
        Todo filter:
        <input
          className="TodoList__input"
          onChange={toSearch}
        />
      </label>

      <label className="TodoList__label">
        Filter by status:
        <select
          className="TodoList__select"
          onChange={toSelect}
        >
          <option value="all">Show all</option>
          <option value="active">Show active</option>
          <option value="completed">Show completed</option>
        </select>
      </label>

      <button
        type="button"
        className="button"
        onClick={toShuffle}
      >
        shuffle
      </button>
    </div>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames('TodoList__item',
              { 'TodoList__item--checked': todo.completed },
              { 'TodoList__item--unchecked': !todo.completed })}
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onClick={() => toCheck(todo.id)}
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={classNames('button',
                { 'TodoList__user-button': todo.completed },
                { 'TodoList__user-button--selected': !todo.completed })}
              type="button"
              onClick={() => selectUser(todo.userId)}
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
    }).isRequired,
  ).isRequired,
  toCheck: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  toSearch: PropTypes.func.isRequired,
  toSelect: PropTypes.func.isRequired,
  toShuffle: PropTypes.func.isRequired,
};
