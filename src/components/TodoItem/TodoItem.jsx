/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, selectUser, selectedUserId }) => {
  return (
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        <li className={`TodoList__item ${todo.completed ? 'TodoList__item--checked' : 'TodoList__item--unchecked' }`}>
          <label>
            <input type="checkbox" readOnly />
            <p>{todo.title}</p>
          </label>

          {selectedUserId === todo.id
          ? ( <button
                onClick={() => { selectUser(0) }}
                className="
                button is-link
                {/*TodoList__user-button TodoList__user-button--selected button*/}
                "
                type="button">User: {todo.userId}
              </button>)
          : ( <button
                onClick={() => { selectUser(todo.id) }}
                className="
                button is-info is-outlined
                {/*TodoList__user-button TodoList__user-button--selected button/}
                "
                type="button">User: {todo.userId}
              </button>
            ) }

        </li>
      </ul>
    </div>
  );
};

TodoItem.propTypes = {
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  todos: PropTypes.arrayOf(PropTypes.shape({
    completed: PropTypes.bool.isRequired,
    id: PropTypes.object.isRequired,
    title: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  })).isRequired,
};
