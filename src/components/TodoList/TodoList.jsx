import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({ todos,
  selectUser,
  filterTodosByTitle,
  todoStart,
  filterTodosByCompleteness,
  completed }) => {
  function getFiltered(todo) {
    return (todo.title && typeof (completed) === 'boolean')
      ? todo.completed === completed
      : todo.title;
  }

  return (
    <div className="TodoList">
      <label htmlFor="sortTodo">Sort Todos </label>
      <input
        type="text"
        id="sortTodo"
        onChange={(event) => {
          filterTodosByTitle(event.target.value);
        }}
      />
      <select onChange={event => filterTodosByCompleteness(event.target.value)}>
        <option>All</option>
        <option>Active</option>
        <option>Completed</option>
      </select>
      <h2>Todos:</h2>

      <ul className="TodoList__list">

        {todos
          .filter(todo => getFiltered(todo))
          .filter(todo => todo.title.startsWith(todoStart))
          .map(todo => (
            <li className="TodoList__item" key={todo.id}>
              <label>
                <input type="checkbox" checked={!!todo.completed} readOnly />
                {todo.title}
              </label>
              <button
                type="button"
                onClick={() => {
                  selectUser(todo.userId);
                }}
              >
                User&nbsp;#
                {todo.userId}
              </button>
            </li>
          ))}

      </ul>
    </div>

  );
};

TodoList.defaultProps = {
  todoStart: '',
  completed: null,
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectUser: PropTypes.func.isRequired,
  filterTodosByTitle: PropTypes.func.isRequired,
  todoStart: PropTypes.string,
  filterTodosByCompleteness: PropTypes.func.isRequired,
  completed: PropTypes.bool,
};
