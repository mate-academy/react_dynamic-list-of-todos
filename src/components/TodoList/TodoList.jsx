import React from 'react';

import './TodoList.scss';

import PropTypes from 'prop-types';
import classNames from 'classnames';

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
            className={classNames({
              TodoList__item: true,
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
            key={todo.id}
          >

            <label>
              <input type="checkbox" readOnly />
              <p>{todo.title}</p>
            </label>

            {todo.userId
              && (
                <button
                  className={classNames({
                    'TodoList__user-button': true,
                    button: true,
                    'TodoList__user-button--selected':
                      todo.userId === selectedUserId,
                  })}
                  type="button"
                  onClick={() => {
                    onSelectUserById(todo.userId);
                  }}
                >
                  User&nbsp;#
                  {todo.userId}
                </button>
              )
            }

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
