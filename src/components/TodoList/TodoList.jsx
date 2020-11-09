import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  getUserId,
  selectByTitle,
  selectByComplete,
  choosedByComplete,
}) => {
  const todolist = todos.filter((todo) => {
    switch (choosedByComplete) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return todo;
    }
  });

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        type="text"
        placeholder="Enter a name"
        onChange={(event) => {
          selectByTitle(event.target.value);
        }}
      />
      <select
        value={choosedByComplete}
        onChange={(event) => {
          selectByComplete(event.target.value);
        }}
      >
        <option
          value="all"
        >
          All
        </option>

        <option
          value="active"
        >
          Active
        </option>

        <option
          value="completed"
        >
          Completed
        </option>
      </select>

      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todolist.map(todo => (
            <li
              key={todo.id}
              className={`TodoList__item TodoList__item--${todo.completed
                ? 'checked' : 'unchecked'}`}
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
                onClick={() => {
                  getUserId(todo.userId);
                }}
              >
                {`User# ${todo.userId}`}
              </button>
            </li>
          ))}

        </ul>
      </div>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  getUserId: PropTypes.func.isRequired,
  selectByTitle: PropTypes.func.isRequired,
  selectByComplete: PropTypes.func.isRequired,
  choosedByComplete: PropTypes.string.isRequired,
};
