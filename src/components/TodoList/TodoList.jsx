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

    <div className="searchWrap">
      <label htmlFor="">
        TODO name:
        <input
          type="text"
          value={titleFilter}
          onChange={inputHandler}
        />
      </label>
      <select onChange={selectHandler}>
        <option value="all">All</option>
        <option value>Finished</option>
        <option value={false}>Unfinished</option>
      </select>
    </div>

    <h2>Todos:</h2>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            // eslint-disable-next-line
            className={`TodoList__item TodoList__item--${todo.completed ? 'checked' : 'unchecked'}`}
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
