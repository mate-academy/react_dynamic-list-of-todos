import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  changeCheked,
  selectedUserId,
  handleChange,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <label>
      Search by title:
      {' '}
      <input
        type="text"
        name="query"
        onChange={handleChange}
      />
    </label>

    <select
      name="statusFilter"
      onChange={handleChange}
    >
      <option value="All">All</option>
      <option value="Completed">Completed</option>
      <option value="Active">Active</option>
    </select>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(item => (
          <li
            key={item.id}
            className={`TodoList__item ${item.completed
              ? 'TodoList__item--checked'
              : 'TodoList__item--unchecked'}
            `}
          >
            <label>
              <input
                type="checkbox"
                checked={item.completed}
                onChange={() => {
                  changeCheked(item.id);
                }}
                readOnly
              />
              <p>{item.title}</p>
            </label>

            <button
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              type="button"
              onClick={() => {
                selectedUserId(item.userId);
              }}
            >
              User&nbsp;#
              {item.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
  })).isRequired,
  changeCheked: PropTypes.func.isRequired,
  selectedUserId: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
