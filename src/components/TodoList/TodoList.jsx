import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = (
  { todos,
    selectUser,
    handleInput,
    handleSelect,
    checkTodo },
) => {
  const handleClick = (userId) => {
    selectUser(userId);
  };

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <input
        placeholder="Filter todo by title"
        onChange={event => handleInput(event.target.value)}
      />

      <select onChange={event => handleSelect(event.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <ul className="TodoList__list">
        {todos.map(todo => (
          <li key={todo.id} className="TodoList__item">
            <label>
              <input
                type="checkbox"
                readOnly
                checked={todo.completed}
                onChange={() => checkTodo(todo.id)}
              />
              {todo.title}
            </label>

            <button
              type="button"
              onClick={() => handleClick(todo.userId)}
            >
              {`User #${todo.userId}`}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    createdAt: PropTypes.string.isRequired,
    updatedAt: PropTypes.string.isRequired,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
  handleInput: PropTypes.func.isRequired,
  handleSelect: PropTypes.func.isRequired,
  checkTodo: PropTypes.func.isRequired,
};
