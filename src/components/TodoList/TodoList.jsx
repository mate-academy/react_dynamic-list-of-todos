import React from 'react';
import './TodoList.scss';
import PropTypes from 'prop-types';
import cn from 'classnames';

export const TodoList = ({
  todos,
  selectedUser,
  selectedUserId,
  onTitle,
  onSelect,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>

    <section className="TodoList__filters">
      <input
        className="TodoList__find"
        type="text"
        name="search"
        autoComplete="off"
        onChange={event => onTitle(event.target.value)}
      />

      <select
        className="TodoList__select"
        onChange={event => onSelect(event.target.value)}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </section>

    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(todo => (
          <li
            key={todo.id}
            className={cn('TodoList__item', {
              'TodoList__item--unchecked': !todo.completed,
              'TodoList__item--checked': todo.completed,
            })}
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                readOnly
              />
              <p>{todo.title}</p>
            </label>

            <button
              className={cn('TodoList__user-button', 'button', {
                'TodoList__user-button--selected':
                selectedUserId === todo.userId,
              })}
              type="button"
              onClick={() => selectedUser(todo.userId)}
            >
              User&nbsp;
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
      title: PropTypes.string,
      userId: PropTypes.number,
      completed: PropTypes.bool,
    }),
  ),
  selectedUserId: PropTypes.number,
  selectedUser: PropTypes.func.isRequired,
  onTitle: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      title: '',
      userId: '',
      completed: null,
    }),
  ),
  selectedUserId: 0,
};
