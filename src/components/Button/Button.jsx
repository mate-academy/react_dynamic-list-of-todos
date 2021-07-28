import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

export const Button = ({ innerText, action }) => {
  const buttonClass = classNames({
    CurrentUser__clear: innerText === 'Clear',
    btn: true,
    'btn-warning': innerText === 'Clear',
    'btn-info': innerText === 'Randomize',
  });

  return (
    <button
      className={buttonClass}
      type="button"
      onClick={action}
    >
      {innerText}
    </button>
  );
};

Button.propTypes = {
  innerText: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
};
