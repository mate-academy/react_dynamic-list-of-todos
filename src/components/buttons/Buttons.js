import React from 'react';
import PropTypes from 'prop-types';

function Buttons({ sort }) {
  return (
    <>
      <button
        onClick={() => sort()}
        className="ui button"
      >
        Sort by Title
      </button>
      <button
        onClick={() => sort('User')}
        className="ui button"
      >
        Sort by User name
      </button>
      <button
        onClick={() => sort('Completed')}
        className="ui button"
      >
        Sort by Status
      </button>
    </>
  );
}

Buttons.propTypes = {
  sort: PropTypes.func.isRequired,
};

export default Buttons;
