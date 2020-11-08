import React from 'react';
import PropTypes from 'prop-types';

export function Todo({
  title,
  userId,
  userSelect,
}) {
  return (
    <li className="TodoList__item TodoList__item--unchecked">
      <label>
        <input type="checkbox" readOnly />
        <p>{title}</p>
      </label>

      <button
        className="
          TodoList__user-button
          TodoList__user-button--selected
          button
        "
        type="button"
        onClick={() => userSelect(userId)}
      >
        User&nbsp;#
        {userId}
      </button>
    </li>
  );
}

Todo.propTypes = {
  title: PropTypes.string.isRequired,
  userId: PropTypes.number,
  userSelect: PropTypes.func.isRequired,
};

Todo.defaultProps = {
  userId: 0,
};
