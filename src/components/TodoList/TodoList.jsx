import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({
  todos,
  selectedUser,
  user,
  handleChange,
  randomTodos,
  selectToggle,
}) => {
  const filteredTodos = todos.filter(todo => (
    todo.title.toLowerCase()
      .includes(user.toLowerCase())
  ));

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        placeholder="Find user"
        name="user"
        value={user}
        onChange={handleChange}
      />
      <select
        name="selectedTodo"
        onChange={selectToggle}
      >
        <option value="all" selected>Show all</option>
        <option value="false">Show active</option>
        <option value="true">Show completed</option>
      </select>
      <button
        type="button"
        className="
          TodoList__user-button
          TodoList__user-button--selected
          button"
        onClick={randomTodos}
      >
        Randomize
      </button>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {filteredTodos.map(todo => (
            <li
              key={todo.id}
              className={todo.completed
                ? 'TodoList__item--checked TodoList__item'
                : 'TodoList__item TodoList__item--unchecked'
              }
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => selectedUser(todo.userId)}
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
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      completed: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  selectedUser: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  randomTodos: PropTypes.func.isRequired,
  selectToggle: PropTypes.func.isRequired,
}.isRequired;
