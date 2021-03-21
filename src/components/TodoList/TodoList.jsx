import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const TodoList = ({
  todos,
  selectHandler,
  search,
  changeHandler,
  choosedSelect,
}) => {
  return (
    <div className="TodoList">
      <h2>Todos:</h2>
      <label>
        <input
          type="text"
          className="TodoList__input"
          value={search}
          onChange={changeHandler}
          placeholder="Search"
          name="search"
        />
      </label>
      <label>
        <select
          className="TodoList__select"
          name="choosedSelect"
          value={choosedSelect}
          onChange={changeHandler}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <div className="TodoList__list-container">
        <ul className="TodoList__list">
          {todos.filter(todo => (
            todo.title && todo.title.includes(search.toLowerCase())
          )).map(todo => (
            <li
              key={todo.id}
              className={classNames(
                'TodoList__item',
                !todo.completed
                  ? 'TodoList__item--unchecked'
                  : 'TodoList__item--checked',
              )}
            >
              <label>
                <input type="checkbox" readOnly />
                <p>{todo.title}</p>
              </label>

              <button
                className="
                  TodoList__user-button
                  TodoList__user-button--selected
                  button
                "
                type="button"
                onClick={() => selectHandler(todo.userId)}
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
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      complited: PropTypes.string.isRequired,
      userId: PropTypes.string.isRequired,
    }).isRequired,
  ),
  selectHandler: PropTypes.func.isRequired,
  search: PropTypes.string,
  changeHandler: PropTypes.func.isRequired,
  choosedSelect: PropTypes.string.isRequired,
};

TodoList.defaultProps = {
  todos: [],
  search: '',
};
