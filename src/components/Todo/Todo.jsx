import React from 'react';
import ClassNames from 'classnames';
import PropTypes from 'prop-types';

export const Todo = ({ title, completed, selectUser, userId }) => (
  <>
    <div>
      <input type="checkbox" />
      <p>{title}</p>
    </div>

    <button
      className={ClassNames('TodoList__user-button', 'button', {
        'TodoList__user-button--selected': completed,
      })}
      type="button"
      value={userId}
      onClick={event => selectUser(event)}
    >
      {`User #${userId}`}
    </button>
  </>
);
Todo.propTypes = {
  title: PropTypes.string.isRequired,
  completed: PropTypes.bool.isRequired,
  selectUser: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};
