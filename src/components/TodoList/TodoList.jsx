import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  selectedUserId,
  query,
  handleChange,
  showSelectedTodo,
  randomTodo,
  isRandomTodo,
}) => {
  const filteredTodos = todos.filter(todo => (
    todo.title.toLowerCase()
      .includes(query.toLowerCase())
  ));

  const randomTodos = [...todos].sort(() => Math.random() - 0.5);
  // let displayedTodo = [];

  // isRandomTodo
  //   ? displayedTodo = randomTodos
  //   : displayedTodo = filteredTodos;

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <input
        type="text"
        placeholder="Find user"
        name="query"
        value={query}
        onChange={handleChange}
      />
      <select
        name="selectedTodo"
        onChange={showSelectedTodo}
      >
        <option value="all">Show all</option>
        <option value="false">Show active</option>
        <option value="true">Show completed</option>
      </select>

      <button
        type="button"
        name="randomize"
        className="
            TodoList__user-button
            TodoList__user-button--selected
            button"
        onClick={randomTodo}
      >
        Randomize
      </button>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {(isRandomTodo
            ? (randomTodos)
            : (filteredTodos)).map(todo => (
              <li
                key={todo.id}
                className={
                  todo.completed
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
                  type="button"
                  name="query"
                  className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button"
                  onClick={() => selectedUserId(todo.userId)}
                >
                  User&nbsp;
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
  selectedUserId: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  showSelectedTodo: PropTypes.func.isRequired,
  randomTodo: PropTypes.func.isRequired,
  isRandomTodo: PropTypes.bool.isRequired,
}.isRequired;
