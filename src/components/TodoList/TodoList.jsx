import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({
  todos,
  getUserId,
  sortedTodos,
  filterTodo,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__search">
      <input
        type="text"
        name="search"
        placeholder="search"
        onChange={({ target }) => filterTodo(target.value)}
      />

      <select onChange={({ target }) => sortedTodos(target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </div>

    <ul className="TodoList__list">
      {todos.map(elem => (
        <li key={elem.id} className="TodoList__item">
          <label>
            <input type="checkbox" readOnly checked={elem.completed} />
            {elem.title}
          </label>
          <button
            type="button"
            onClick={() => getUserId(elem.userId)}
          >
            User:&nbsp;#
            {elem.userId}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    completed: PropTypes.bool,
    userId: PropTypes.number,
  }).isRequired).isRequired,
  getUserId: PropTypes.func.isRequired,
  sortedTodos: PropTypes.func.isRequired,
  filterTodo: PropTypes.func.isRequired,
};
