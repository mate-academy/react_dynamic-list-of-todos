import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const Todo = ({ completed, title, userId, selectedUserId, selectUser }) => (
  <>
    <label>
      <input type="checkbox" checked={completed} readOnly />
      <p>{title}</p>
    </label>

    <button
      className={classNames(
        'TodoList__user-button',
        'button',
        {
          'TodoList__user-button--selected': (
            userId === selectedUserId
          ),
        },
      )}
      type="button"
      onClick={() => selectUser((userId))}
    >
      {`User #${userId}`}
    </button>
  </>
);

Todo.propTypes = {
  completed: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  userId: PropTypes.number.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};

export default Todo;
