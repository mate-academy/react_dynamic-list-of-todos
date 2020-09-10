import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({
  todos,
  selectUser,
  selectedUserId,
  filterByTitle,
  selectByCompleted,
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
            className={`TodoList__item ${(completed)
              ? 'TodoList__item--checked'
              : 'TodoList__item--unchecked'}`}
          >
            <label>
              <input type="checkbox" checked={completed} readOnly />
              <p>{title}</p>
            </label>
            <button
              className={`button ${(selectedUserId === userId)
                ? 'TodoList__user-button--selected'
                : 'TodoList__user-button'}`}
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
};
