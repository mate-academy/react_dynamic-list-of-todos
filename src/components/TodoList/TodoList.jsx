import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = (props) => {
  const {
    todos,
    selectUser,
    setQueryText,
    setQueryCategory,
    textFilter,
    categoryFilter,
  } = props;

  let filteredTodos = textFilter(todos);

  filteredTodos = categoryFilter(filteredTodos);

  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <label>
        Find
        <input
          type="text"
          onChange={setQueryText}
        />
      </label>
      <select onChange={setQueryCategory}>
        <option value="all">All</option>
        <option value="true">Completed</option>
        <option value="false">Active</option>
      </select>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {
            filteredTodos.map(todo => (
              <li
                key={todo.id}
                className={!todo.completed
                  ? 'TodoList__item TodoList__item--unchecked'
                  : 'TodoList__item TodoList__item--checked'}
              >
                <label>
                  <input type="checkbox" readOnly />
                  <p>{todo.title}</p>
                </label>
                <button
                  className="
                    TodoList__user-button
                    TodoList__user-button--selected
                    button"
                  type="button"
                  onClick={selectUser(todo.userId)}
                >
                  User&nbsp; #
                  {
                    todo.userId
                  }
                </button>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape(),
  ).isRequired,
  selectUser: PropTypes.func.isRequired,
  setQueryText: PropTypes.func.isRequired,
  setQueryCategory: PropTypes.func.isRequired,
  textFilter: PropTypes.func.isRequired,
  categoryFilter: PropTypes.func.isRequired,
};
