import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({ todos, selectUser, query, setState, filterBy }) => {
  const unchecked = 'TodoList__item--unchecked';
  const checked = 'TodoList__item--checked';

  const todosToShow = todos
    .filter((todo) => {
      switch (filterBy) {
        case 'active':
          return todo.completed === false;
        case 'completed':
          return todo.completed === true;
        default:
          return todo;
      }
    })
    .filter(todo => todo.title.toLowerCase()
      .includes(query.toLowerCase()));

  return (
    <div className="TodoList">
      <h2>Todos:</h2>

      <div className="TodoList__list-container">
        <input
          type="text"
          name="searchQuery"
          value={query}
          onChange={setState}
        />
        <select
          name="filterBy"
          value={filterBy}
          onChange={setState}
        >
          <option value="all">all</option>
          <option value="active">active</option>
          <option value="completed">completed</option>
        </select>
        <ul className="TodoList__list">
          {todosToShow.map(todo => (
            <li
              className={classNames('TodoList__item', {
                [checked]: todo.completed === true,
                [unchecked]: todo.completed === false,
              })}
              key={todo.id}
            >
              <label>
                <input type="checkbox" />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => {
                  selectUser(todo.userId);
                }}
              >
                {`User #${todo.userId}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  })).isRequired,
  selectUser: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  setState: PropTypes.func.isRequired,
  filterBy: PropTypes.string.isRequired,
};
