import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  selectUser,
  nameFilter,
  completedFilter,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <input
      type="text"
      placeholder="filter"
      onChange={event => nameFilter(event.target.value)}
    />
    <select onChange={event => completedFilter(event.target.value)}>
      <option>All</option>
      <option value="completed">Completed</option>
      <option value="notCompleted">Not completed</option>
    </select>

    <div className="TodoList__list-container">

      <ul className="TodoList__list">
        {todos.map(todo => (

          <li
            className={classNames({
              TodoList__item: true,
              'TodoList__item--checked': todo.completed,
              'TodoList__item--unchecked': !todo.completed,
            })}
            key={todo.id}
          >
            <label>
              <input
                type="checkbox"
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className="
              TodoList__user-button
              TodoList__user-button--selected
              button
            "
              type="button"
              onClick={() => selectUser(todo.userId)}
            >
              user:
              {' '}
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
    }),
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  nameFilter: PropTypes.func.isRequired,
  completedFilter: PropTypes.func.isRequired,
};
