import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ isLoading, getData }) => (
  <div>

    <button type="button" onClick={getData}>
      {
        isLoading
          ? 'Loading...'
          : 'Load'
      }
    </button>
  </div>
);

Button.propTypes = {
  isLoading: PropTypes.string.isRequired,
  getData: PropTypes.func.isRequired,
};

export default Button;
