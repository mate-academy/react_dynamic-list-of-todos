import React from 'react';
import classNames from 'classnames';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({ text,
  status,
  currentTodos,
  selectUser,
  selectStatus,
  filterByTitle,
  changeStatus,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <label htmlFor="search">Search your todo: </label>
    <input
      type="text"
      name="search"
      id="search"
      placeholder="Todo title"
      value={text}
      onChange={(event) => {
        const { value } = event.target;

        filterByTitle(value.trimLeft());
      }}
    />
    <select
      className="TodoList__select"
      value={status}
      onChange={(event) => {
        const { value } = event.target;
        selectStatus(value);
      }}
    >
      <option value="All">All</option>
      <option value="Active">Active</option>
      <option value="Completed">Completed</option>
    </select>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {currentTodos.map(todo => (
          <li
            className={classNames('TodoList__item',
              {
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
            key={todo.id}
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => changeStatus(todo.id)}
              />
              <p>{todo.title}</p>
            </label>

            <button
              className="TodoList__user-button button"
              type="button"
              onClick={selectUser}
            >
              User&nbsp;#{todo.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  currentTodos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  selectStatus: PropTypes.func.isRequired,
  filterByTitle: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
};
