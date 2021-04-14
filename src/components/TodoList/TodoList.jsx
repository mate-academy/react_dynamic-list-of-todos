import React from 'react';
import PropTypes from 'prop-types';

import './TodoList.scss';

export const TodoList = ({ filteredTodos, selectedUser }) => (
  <div className="TodoList">
    <h2>Todos:</h2>
    <div className="TodoList__list-container">

      <ul className="TodoList__list">
        {filteredTodos.map(({ id, title, userId, completed }) => (
          <li
            className={`TodoList__item
              ${completed
              ? 'TodoList__item--unchecked'
              : 'TodoList__item--checked'}`}
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
              className={`TodoList__user-button button
              ${completed
                ? 'TodoList__user-button--selected'
                : ''}`}
              type="button"
              onClick={() => selectedUser(userId)}
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
  filteredTodos: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    userId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
  })),
  selectedUser: PropTypes.func.isRequired,
};

TodoList.defaultProps = {
  filteredTodos: 'no todo yet',
};
