import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export const TodoList = ({ setId, todos, filterByTitle, filterByStatus }) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <input
      type="text"
      name="title"
      className="TodoList__input"
      placeholder="Enter the title"
      onChange={(event) => {
        filterByTitle(event.target.value);
      }}
    />

    <select
      name="select"
      className="TodoList__select"
      onChange={(event) => {
        filterByStatus(event.target.value);
      }}
    >
      <option value="">
        All todos
      </option>

      <option value="completed">
        Complited todos
      </option>

      <option value="active">
        Active todos
      </option>
    </select>

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
              <input type="checkbox" checked={todo.completed} readOnly />
              <p>{todo.title}</p>
            </label>

            <button
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              type="button"
              onClick={() => {
                setId(todo.userId);
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
      title: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      id: PropTypes.number.isRequired,
    }),
  ),
  setId: PropTypes.func.isRequired,
  filterByTitle: PropTypes.func.isRequired,
  filterByStatus: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: [],
};
