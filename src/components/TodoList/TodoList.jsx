import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export const TodoList = ({
  todos,
  selectUser,
  selectedUserId,
  filterByTitle,
  selectByCompleted,
  changeCompleted,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <label htmlFor="filter">Filter todos by title </label>
    <input
      type="text"
      id="filter"
      className="filter"
      onChange={event => filterByTitle(event.target.value)}
    />

    <select
      className="select"
      onChange={event => selectByCompleted(event.target.value)}
    >
      {['all', 'active', 'completed'].map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(({ id, title, completed, userId }) => (
          <li
            key={id}
            className={classNames('TodoList__item', {
              'TodoList__item--checked': completed,
              'TodoList__item--unchecked': !completed,
            })}
          >
            <label>
              <input
                type="checkbox"
                checked={completed}
                onChange={() => changeCompleted(id)}
              />
              <p>{title}</p>
            </label>
            <button
              className={classNames('button', {
                'TodoList__user-button--selected': selectedUserId === userId,
                'TodoList__user-button': selectedUserId !== userId,
              })}
              type="button"
              onClick={() => selectUser(userId)}
            >
              User&nbsp;
              {userId}
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
      title: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      userId: PropTypes.number.isRequired,
    }),
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  filterByTitle: PropTypes.func.isRequired,
  selectByCompleted: PropTypes.func.isRequired,
  changeCompleted: PropTypes.func.isRequired,
};
