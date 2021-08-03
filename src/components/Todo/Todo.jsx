import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

export const Todo = ({
  completed,
  title,
  userId,
  selectedUserId,
  chooseUser,
}) => (
  <>
    <label>
      <input
        type="checkbox"
        checked={completed}
        readOnly
      />
      <p>{title}</p>
    </label>

    <button
      className={classnames(
        'TodoList__user-button',
        { 'TodoList__user-button--selected': userId === selectedUserId },
        'button',
      )}
      type="button"

      onClick={() => {
        chooseUser(userId);
      }}
    >
      User&nbsp;#
      {userId}
    </button>
  </>
);

Todo.defaultProps = {
  completed: false,
  title: '',
  selectedUserId: 0,
  userId: 0,
};

Todo.propTypes = {
  completed: PropTypes.bool,
  title: PropTypes.string,
  selectedUserId: PropTypes.number,
  userId: PropTypes.number,
  chooseUser: PropTypes.func.isRequired,
};
