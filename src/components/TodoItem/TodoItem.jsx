/* eslint-disable */
import React from 'react';
import PropTypes from 'prop-types';

export const TodoItem = ({ todo, selectUser, selectedUserId }) => {
  const styles = selectedUserId === todo.id ? 'button is-link' : 'button is-info is-outlined';
  const getSelectedId = selectedUserId === todo.id ? 0 : todo.userId;
  const itemStyles = `TodoList__item ${todo.completed ? 'TodoList__item--checked' : 'TodoList__item--unchecked' }`;

  return (
    <div className="TodoList__list-container">
      <ul className="TodoList__list">
        <li className={itemStyles}>
          <label>
            <input
              className={itemStyles}
              type="checkbox" readOnly />
            <p>{todo.title}</p>
          </label>
            <button
              onClick={() => selectUser(getSelectedId)}
              className={styles}
              type="button">
              User: {todo.userId}
            </button>
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
