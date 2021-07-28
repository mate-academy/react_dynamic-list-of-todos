import React from 'react';
import classNames from 'classnames';
import { TodoButtonShape } from '../../types';

export const UserSelectButton = ({ userId, selectedUserId, action }) => {
  const buttonClass = classNames({
    'TodoList__user-button': true,
    button: true,
    'TodoList__user-button--selected': selectedUserId === userId,
  });

  return (
    <button
      className={buttonClass}
      type="button"
      onClick={action}
    >
      User&nbsp;#
      {userId}
    </button>
  );
};

UserSelectButton.propTypes = TodoButtonShape;
