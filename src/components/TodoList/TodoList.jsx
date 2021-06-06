import React from 'react';
import './TodoList.scss';
import propTypes from 'prop-types';
import { Todo } from '../Todo';

export const TodoList = ({
  selectUser, searchTodo, onStatusChange, randomizeTodos, todos,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <div className="TodoList__list-container">
      <input
        placeholder="todo title"
        onChange={
                searchTodo
            }
      />
      <select
        onChange={onStatusChange}
      >
        <option value={0}>status</option>
        <option value={1}>in progress</option>
        <option value={2}>completed</option>
      </select>
      <button
        className="button"
        type="button"
        onClick={randomizeTodos}
      >
        Randomize
      </button>
      <ul className="TodoList__list">
        {
              todos.map(
                todo => (
                  <Todo
                    key={todo.id}
                    todo={todo}
                    selectUser={selectUser}
                  />
                ),
              )
            }
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      completed: propTypes.bool.isRequired,
      title: propTypes.string.isRequired,

    }),
  ).isRequired,
  selectUser: propTypes.func.isRequired,
  searchTodo: propTypes.func.isRequired,
  onStatusChange: propTypes.func.isRequired,
  randomizeTodos: propTypes.func.isRequired,
};
