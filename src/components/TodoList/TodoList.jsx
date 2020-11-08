import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  selectedTodoId,
  onClick,
  filterInputValue,
  onFilterInputChange,
  selectValue,
  onSelectValueChange,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <input
      value={filterInputValue}
      name="filterTodo"
      placeholder="Search Todo"
      onChange={event => onFilterInputChange(event.target.value)}
    />

    <select
      onChange={event => onSelectValueChange(event.target.value)}
      value={selectValue}
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="notCompleted">Not completed</option>
    </select>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames({
              TodoList__item: true,
              'TodoList__item--checked': todo.completed === true,
              'TodoList__item--unchecked': todo.completed === false,
            })}
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={classNames({
                button: true,
                'TodoList-user-button': true,
                'TodoList__user-button--selected': selectedTodoId === todo.id,
              })}
              type="button"
              onClick={() => onClick(todo.userId, todo.id)}
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
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool,
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
  })).isRequired,
  selectedTodoId: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  filterInputValue: PropTypes.string.isRequired,
  onFilterInputChange: PropTypes.func.isRequired,
  selectValue: PropTypes.string.isRequired,
  onSelectValueChange: PropTypes.func.isRequired,
};
