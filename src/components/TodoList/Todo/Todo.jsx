import React from 'react';

export const Todo = ({ todo, setSelectedUserId, selectedUserId }) => {
  const {completed, title, id, userId } = todo;

  return (
    <li className={`TodoList__item ${completed
      ? 'TodoList__item--checked'
      : 'TodoList__item--unchecked'
    }`
    }
    >

      <label>
        {
          completed
            ? <input type="checkbox" checked readOnly />
            : <input type="checkbox" readOnly />
        }
        <p>{title}</p>
      </label>

      <button
        className={`TodoList__user-button button ${userId === selectedUserId
          ? 'TodoList__user-button--selected' : ''}`}
        type="button"
        onClick={() => setSelectedUserId(userId)}
      >
        User&nbsp;#
        {id}
      </button>
    </li>
  );
};
