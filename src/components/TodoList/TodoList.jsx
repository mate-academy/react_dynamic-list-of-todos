import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  selectUser,
  handleSelect,
  handleInputChange,
  changeStatus,
  filterByChoise,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__container">
      <input
        type="text"
        placeholder="Filter by word"
        className="TodoList__input"
        onChange={event => handleInputChange(event.target.value)}
      />

      <select
        className="TodoList__select"
        value={filterByChoise}
        onChange={handleSelect}
      >
        <option value="">Choose filter</option>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            className={todo.completed
              ? 'TodoList__item TodoList__item--checked'
              : 'TodoList__item TodoList__item--unchecked'
            }
            key={todo.id}
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onClick={() => changeStatus(todo.id)}
                readOnly
              />
              {todo.title}
            </label>

            <button
              className="TodoList__user-button"
              type="button"
              onClick={() => selectUser(todo.userId)}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectUser: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  filterByChoise: PropTypes.string.isRequired,
};
