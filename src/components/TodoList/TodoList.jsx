import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import { Todo } from '../Todo';

export function TodoList({ todos, selectedTodoId, handleChange }) {
  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.map(({ id, completed, title, userId }) => (
            <Todo
              key={id}
              completed={completed}
              title={title}
              userId={userId}
              id={id}
              selectedTodoId={selectedTodoId}
              handleChange={handleChange}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      title: PropTypes.string.isRequired,
      userId: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  selectedTodoId: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};
