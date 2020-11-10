import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './TodoList.scss';

export const TodoList = ({
  todos,
  selectedTodoId,
  status,
  query,
  selectedUser,
  changeStatus,
  handleSelect,
  handleChange
}) => {

  switch (status) {
    case 'Completed':
      todos = todos.filter(todo => todo.completed);
      break;
    case 'Not completed':
      todos = todos.filter(todo => !todo.completed);
      break;
    default:
      break;
  }

  if (query) {
    todos = todos.filter(todo => todo.title.includes(query));
  }

  return (
    <div className="TodoList">
      <input
        type="text"
        placeholder="Search by title"
        onChange={handleChange}
      />
      <select
        value={status}
        onChange={handleSelect}
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Not completed">Not completed</option>
      </select>

      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(todo => (
            <li
              key={todo.id}
              className={classNames({
                TodoList__item: true,
                'TodoList__item--unchecked': !todo.completed,
                'TodoList__item--checked': todo.completed,
              })}
            >
              <label>
                <input
                  type="checkbox"
                  readOnly
                  checked={todo.completed}
                  onClick={() => changeStatus(todo.id)}
                />
                <p>{todo.title}</p>
              </label>
              <button
                className={todo.id === selectedTodoId
                  ? 'TodoList__user-button--selected'
                  : 'TodoList__user-button'
                }
                type="button"
                onClick={() => selectedUser(todo.userId, todo.id)}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number.isRequired,
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  selectedTodoId: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  query: PropTypes.string.isRequired,
  selectedUser: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
