import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TodoItem = ({
  userId,
  completed,
  title,
  selectedUserId,
  selectUser,
}) => (
  <>
    <label>
      <input type="checkbox" checked={completed} readOnly />
      <p>{title}</p>
    </label>

    <button
      className={classNames('button TodoList__user-button', {
        'TodoList__user-button--selected': (
          userId === selectedUserId
        ),
      })}
      type="button"
      onClick={() => selectUser(userId)}
    >
      {`UserId #${userId}`}
    </button>
  </>
);

TodoItem.propTypes = {
  userId: PropTypes.number,
  completed: PropTypes.bool,
  title: PropTypes.string.isRequired,
  selectedUserId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};

TodoItem.defaultProps = {
  userId: 0,
  completed: false,
};
