import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  handleSelect,
  handleFilter,
  viewUser,
  onChecked,
}) => (

  <div className="TodoList">
    <h2>Todos:</h2>
    <form>
      <label htmlFor="filter">
        Filter
        <input
          type="text"
          name="filter"
          onChange={event => handleFilter(event.target.value)}
        />
      </label>
      <label>
        <select
          onChange={event => handleSelect(event.target.value)}
        >
          <option value="All">
            Choose a type
          </option>
          <option value="Completed">
            Completed
          </option>
          <option value="Not completed">
            Not completed
          </option>
        </select>
      </label>
    </form>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(item => (
          <li
            className="TodoList__item TodoList__item--unchecked"
            key={item.id}
          >
            <label>
              <input
                type="checkbox"
                readOnly
                checked={item.completed}
                onChange={() => onChecked(item.id)}
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
              onClick={() => viewUser(item.userId)}
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
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool,
    }).isRequired,
  ).isRequired,
  viewUser: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  onChecked: PropTypes.func.isRequired,
};
