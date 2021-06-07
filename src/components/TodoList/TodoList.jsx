import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({
  todos,
  titleFilter,
  selectedUserId,
  selectUser,
  inputHandler,
  selectHandler,
}) => (
  <div className="TodoList">

    <h2>Todos:</h2>

    <div className="TodoList__list-container">
      <div className="search-bar">
        <label htmlFor="">
          <input
            className="search-bar-input"
            placeholder="Enter ToDo title"
            type="text"
            value={titleFilter}
            onChange={inputHandler}
          />
        </label>
        <select onChange={selectHandler}>
          <option value="all">All</option>
          <option value="finished">Finished</option>
          <option value="unfinished">Unfinished</option>
        </select>
      </div>

      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={`TodoList__item TodoList__item--${todo.completed
              ? 'checked'
              : 'unchecked'}`}
          >
            <label>
              {todo.completed ? (
                <input
                  type="checkbox"
                  checked
                  readOnly
                />
              ) : (
                <input
                  type="checkbox"
                  readOnly
                />
              )}
              <p>{todo.title}</p>
            </label>

            <button
              className={selectedUserId === todo.userId ? (
                'TodoList__user-button--selected button'
              ) : (
                'TodoList__user-button button'
              )}
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
  </div>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      userId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      completed: PropTypes.bool.isRequired,
    }),
  ).isRequired,
  titleFilter: PropTypes.string.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
  inputHandler: PropTypes.func.isRequired,
  selectHandler: PropTypes.func.isRequired,

};
