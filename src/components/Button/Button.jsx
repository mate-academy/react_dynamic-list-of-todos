import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ userId, selectUser }) => (
  <>
    <button
      className="
        TodoList__user-button
        TodoList__user-button--selected
        button
      "
      type="button"
      onClick={() => selectUser(userId)}
    >
      User&nbsp;#
      {userId}
    </button>
  </>
);

Button.propTypes = {
  userId: PropTypes.number.isRequired,
  selectUser: PropTypes.func.isRequired,
};
