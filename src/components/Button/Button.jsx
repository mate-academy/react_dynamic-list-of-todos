import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ shuffleTodos }) => (
  <button
    type="button"
    className="button TodoList__user-button--selected"
    onClick={shuffleTodos}
  >
    Shuffle
  </button>
);

Button.propTypes = {
  shuffleTodos: PropTypes.func.isRequired,
};
