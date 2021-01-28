import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import ClassNames from 'classnames';
import { TypeTodo } from '../../types';

export const TodoList = React.memo(({
  randomize,
  checkTodo,
  todos,
  status,
  selectUser,
  filterTodos,
  searchTodos,
  searchValue,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <form>
      <input
        id="search-query"
        type="text"
        placeholder="search"
        value={searchValue}
        onChange={searchTodos}
      />

      <select
        name="status"
        value={status}
        onChange={filterTodos}
      >
        <option disabled>Select an option</option>
        <option value="all">all</option>
        <option value="active">active</option>
        <option value="completed">completed</option>
      </select>
    </form>
    <button type="button" onClick={randomize}>
      Randomize / Stop randomizing
    </button>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">

        {todos.map(todo => (
          <li
            key={todo.id}
            className={ClassNames(
              'TodoList__item',
              { 'TodoList__item--unchecked': !todo.completed },
              { 'TodoList__item--checked': todo.completed },
            )}
          >
            <label>
              <input
                checked={todo.completed}
                type="checkbox"
                onChange={() => {
                  checkTodo(todo.id);
                }}
              />
              <p>{todo.title}</p>
            </label>

            <button
              onClick={() => {
                selectUser(todo.userId);
              }}
              className="
                      TodoList__user-button
                      TodoList__user-button--selected
                      button
                    "
              type="button"
            >
              User&nbsp;
              {todo.userId}
            </button>

          </li>
        ))}
      </ul>
    </div>
  </div>
));

TodoList.propTypes = {
  todos: PropTypes.arrayOf(TypeTodo).isRequired,
  randomize: PropTypes.func.isRequired,
  checkTodo: PropTypes.func.isRequired,
  status: PropTypes.string,
  selectUser: PropTypes.func.isRequired,
  filterTodos: PropTypes.func.isRequired,
  searchTodos: PropTypes.func.isRequired,
  searchValue: PropTypes.string,
};

TodoList.defaultProps = {
  status: 'all',
  searchValue: '',
};
