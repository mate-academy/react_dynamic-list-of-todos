import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  selectedUserId,
  titleSearch,
  onSearchByTitle,
  onSelectUserById,
  onSetTodosStatus,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <div className="TodoList__filter-container">
      <input
        className="TodoList__search"
        id="TodoList-search"
        type="text"
        name="TodoList-search"
        placeholder="Search"
        value={titleSearch}
        onChange={({ target }) => onSearchByTitle(target)}
      />

      <select
        name="TodoList-select"
        id="TodoList-select"
        className="TodoList__select"
        onChange={event => onSetTodosStatus(event.target.value)}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>

      </select>
    </div>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">

        {todos.map(todo => (

          <li
            className={todo.completed
              ? 'TodoList__item TodoList__item--checked'
              : 'TodoList__item TodoList__item--unchecked'}
            key={todo.id}
          >

            <label>
              <input type="checkbox" readOnly />
              <p>{todo.title}</p>
            </label>

            <button
              className={todo.userId === selectedUserId
                ? `TodoList__user-button
                   TodoList__user-button--selected
                   button`
                : `TodoList__user-button button`
              }
              type="button"
              onClick={() => {
                onSelectUserById(todo.userId);
              }}
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

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedUserId: PropTypes.number,
  titleSearch: PropTypes.string,
  onSearchByTitle: PropTypes.func.isRequired,
  onSelectUserById: PropTypes.func.isRequired,
  onSetTodosStatus: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  selectedUserId: 0,
  titleSearch: '',
};
