import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  selectUser,
  findTodo,
  filterByCompleted,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <select onChange={filterByCompleted}>
        <option value="all">
          All
        </option>
        <option value="active">
          Active
        </option>
        <option value="completed">
          Completed
        </option>
      </select>
      <input
        type="text"
        placeholder="Find todo"
        onChange={event => findTodo(event.target.value)}
      />

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
                readOnly
              />
              <p>{todo.title}</p>
            </label>
            <button
              className="TodoList__user-button button"
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
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectUser: PropTypes.func.isRequired,
  findTodo: PropTypes.func.isRequired,
  filterByCompleted: PropTypes.func.isRequired,
};
