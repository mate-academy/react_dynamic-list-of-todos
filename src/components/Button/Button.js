import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ className, onClick, content }) => (
  <button
    className={className}
    type="button"
    onClick={onClick}
  >
    {content}
  </button>
);

Button.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  content: PropTypes.string.isRequired,
};

Button.defaultProps = {
  className: '',
};
