import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({
  todos,
  selectUser,
  filterTodos,
  filterCompleted,
}) => (
  <div className="TodoList">
    <input
      type="text"
      placeholder="Enter the title of todo"
      onChange={event => filterTodos(event.target.value)}
    />
    <select onChange={event => filterCompleted(event.target.value)}>
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>
    <h2>Todos:</h2>
    <ul className="TodoList__list">
      {todos.map(todo => (
        <li className="TodoList__item" key={todo.id}>
          <label>
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
            />
            {todo.title}
          </label>

          <button
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
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.string.isRequierd,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
  filterTodos: PropTypes.func.isRequired,
  filterCompleted: PropTypes.func.isRequired,
};
