import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import classnames from 'classnames';

export const TodoList = ({
  todos, userId, selectUser, handleChange, query, selectValue,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <input
      type="text"
      name="query"
      placeholder="input a task"
      value={query}
      onChange={handleChange}
    />

    <select onChange={handleChange} value={selectValue} name="selectValue">
      <option value="">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">

        {todos.map(todo => (
          <li
            key={todo.id}
            className={`TodoList__item TodoList__item--${
              todo.completed ? '' : 'un'}checked`
            }
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
              className={classnames(
                'TodoList__user-button',
                'button',
                { 'TodoList__user-button--selected': userId === todo.userId },
              )}
              type="button"
              onClick={() => selectUser(todo.userId)}
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
  todos: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  userId: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  selectUser: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  selectValue: PropTypes.string.isRequired,
};
