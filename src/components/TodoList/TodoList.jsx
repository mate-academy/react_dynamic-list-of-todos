import React from 'react';
import PropTypes from 'prop-types';
import './TodoList.scss';

export const TodoList = ({ todos, onSelectUserId }) => (
  //
  <div className="TodoList">
    <h2>Todos:</h2>

    <div className="TodoList__list-container TodoList__item--checked">
      <ul className="TodoList__list">
        {todos.map(({ title, completed, userId, id }) => (
          <li
            key={id}
            className={
              `TodoList__item  ${
                completed || 'TodoList__item--unchecked'
              }`
            }
          >
            <label>
              <input type="checkbox" checked={completed} readOnly />
              <p>{title}</p>
            </label>

            <button
              className="
                TodoList__user-button
                TodoList__user-button--selected
                button
              "
              onClick={() => onSelectUserId(userId)}
              type="button"
            >
              User&nbsp;#
              {userId}
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
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })).isRequired,
  onSelectUserId: PropTypes.func.isRequired,
};
