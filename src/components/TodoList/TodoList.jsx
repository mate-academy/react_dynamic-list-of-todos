import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';
import classNames from 'classnames';

export const TodoList = ({
  todos,
  onUserSelection,
  onCompletedChange,
  userId,
  inputValue,
  onTodosFilter,
  selectValue,
  onSelectValueChange,
}) => (
  <div className="TodoList">
    <h2>{`Todos: ${todos.length}`}</h2>

    <div>
      <input
        placeholder="Search todos"
        type="text"
        value={inputValue}
        onChange={onTodosFilter}
      />

      <select
        name=""
        id=""
        value={selectValue}
        onChange={onSelectValueChange}
      >
        <option value="all">
          All
        </option>
        <option value="active">
          Active
        </option>
        <option value="completed">
          Completed
        </option>
      </select>
    </div>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={classNames('TodoList__item', {
              'TodoList__item--checked': todo.completed,
              'TodoList__item--unchecked': !todo.completed,
            })}
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => {
                  onCompletedChange(todo.id);
                }}
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={classNames('TodoList__user-button', 'button', {
                'TodoList__user-button--selected': todo.userId === userId,
              })}
              type="button"
              onClick={() => {
                onUserSelection(todo.userId);
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

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    completed: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired).isRequired,
  onUserSelection: PropTypes.func.isRequired,
  onCompletedChange: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
  inputValue: PropTypes.string.isRequired,
  onTodosFilter: PropTypes.func.isRequired,
  selectValue: PropTypes.string.isRequired,
  onSelectValueChange: PropTypes.func.isRequired,
};
