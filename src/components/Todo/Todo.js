/* eslint-disable comma-dangle */
/* eslint-disable arrow-parens */
import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

export function Todo(props) {
  const {
    todo: { id, title, userId, completed },
    setSelectedUserId,
    setPressedUserBtn,
    pressedUserBtn,
  } = props;

  return (
    <li
      className={`TodoList__item ${
        completed ? 'TodoList__item--checked' : 'TodoList__item--unchecked'
      }`}
      key={id}
    >
      <label>
        <input type="checkbox" checked={completed} readOnly />
        <p>{title}</p>
      </label>

      <button
        className={cn(
          'TodoList__user-button',
          { 'TodoList__user-button--selected': pressedUserBtn === id },
          'button'
        )}
        type="button"
        onClick={() => {
          setPressedUserBtn(id);
          setSelectedUserId(userId);
        }}
      >
        {`User #${userId}`}
      </button>
    </li>
  );
}

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    userId: PropTypes.number,
    title: PropTypes.string,
    completed: PropTypes.bool,
  }),
  setPressedUserBtn: PropTypes.func.isRequired,
  pressedUserBtn: PropTypes.number,
  setSelectedUserId: PropTypes.func.isRequired,
};

Todo.defaultProps = {
  todo: {},
  pressedUserBtn: 0,
};
