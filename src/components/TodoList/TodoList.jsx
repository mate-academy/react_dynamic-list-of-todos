import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  selectedUserById,
  inputValue,
  onSearchHandler,
  selectedUserId,
  onSelectHandler,
  selectedValue,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <input
      className="searchTodoList"
      onChange={e => onSearchHandler(e)}
      value={inputValue}
      placeholder="Search"
    />
    <select
      className="selectFilter"
      onChange={onSelectHandler}
      selected={selectedValue}
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(el => (
          <li
            className={el.completed
              ? 'TodoList__item TodoList__item--checked'
              : 'TodoList__item TodoList__item--unchecked'}
            key={el.id}
          >
            <label>
              <input type="checkbox" defaultChecked={el.completed} readOnly />
              <p>{el.title}</p>
            </label>

            <button
              className={el.userId === selectedUserId
                ? 'TodoList__user-button--selected button'
                : 'TodoList__user-button button'
              }
              type="button"
              onClick={() => selectedUserById(el.userId)}
            >
              User&nbsp;
              {el.userId}
            </button>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedUserById: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
  onSearchHandler: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  onSelectHandler: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
};
