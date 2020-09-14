import React from 'react';
import './TodoList.scss';
import classNames from 'classnames';
import propTypes from 'prop-types';

export const TodoList = ({
  todos,
  selectUser,
  selectedUserId,
  controlFilter,
  currentFilterValue,
  controlSelect,
}) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <input
      type="text"
      placeholder="filter by title"
      onChange={event => controlFilter(event.target.value)}
    />
    <select
      onChange={event => controlSelect(event.target.value)}
    >
      <option selected>all</option>
      <option>active</option>
      <option>completed</option>
    </select>
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        {todos.map(({ id, userId, title, completed }) => {
          if (title && title.includes(currentFilterValue)) {
            return (
              <li
                className={classNames(
                  'TodoList__item',
                  completed
                    ? 'TodoList__item--unchecked'
                    : 'TodoList__item--checked',
                )}
                key={id}
              >
                <label>
                  <input
                    type="checkbox"
                    checked={completed}
                    readOnly
                  />
                  <p>{title}</p>
                </label>
                <button
                  className={classNames(
                    'TodoList__user-button',
                    'button',
                    userId === selectedUserId
                      ? 'TodoList__user-button--selected'
                      : '',
                  )}
                  type="button"
                  onClick={() => selectUser(userId)}
                >
                  User&nbsp;
                  {userId}
                </button>
              </li>
            );
          }

          return;
        })}
      </ul>
    </div>
  </div>
);

TodoList.propTypes = {
  todos: propTypes.arrayOf(propTypes.shape({
    id: propTypes.number.isRequired,
    userId: propTypes.string.isRequierd,
    title: propTypes.string.isRequired,
    completed: propTypes.bool.isRequiered,
    createdAt: propTypes.string,
    updatedAt: propTypes.string,
  })).isRequired,
  selectUser: propTypes.func.isRequired,
  selectedUserId: propTypes.number.isRequired,
  controlFilter: propTypes.func.isRequired,
  currentFilterValue: propTypes.string.isRequired,
  controlSelect: propTypes.func.isRequired,
  currentSelectValue: propTypes.string.isRequired,
};
