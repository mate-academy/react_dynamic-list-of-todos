import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  selectUser,
  filterByTitle,
  filterByCompleted,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <input
        type="text"
        onChange={event => filterByTitle(event.target.value)}
      />
      <select onChange={event => filterByCompleted(event.target.value)}>
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
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={todo.completed
              ? 'TodoList__item TodoList__item--checked'
              : 'TodoList__item TodoList__item--unchecked'
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
              className="
                TodoList__user-button
                button
              "
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
  filterByTitle: PropTypes.func.isRequired,
  filterByCompleted: PropTypes.func.isRequired,
};
