import React from 'react';
import PropTypes from 'prop-types';

import './NotLoaded.css';

const NotLoaded = ({ loadFunction, isLoading }) => (
  <div className="block">
    {
      isLoading
        ? (
          <button type="button" className="block__btn" disabled>
            <div className="load-ring" />
          </button>
        )
        : (
          <button
            type="button"
            className="block__btn"
            onClick={loadFunction}
          >
            Load data
          </button>
        )
    }
  </div>
);

NotLoaded.propTypes = {
  loadFunction: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default NotLoaded;
