import React from 'react';
import PropTypes from 'prop-types';

function Buttons({ onSort }) {
  return (
    <div>
      <button
        type="button"
        className="ui primary basic button"
        onClick={() => onSort('Title')}
      >
        Sort by Title
      </button>
      <button
        type="button"
        className="ui secondary basic button"
        onClick={() => onSort('User')}
      >
        Sort by User
      </button>
      <button
        type="button"
        className="ui positive basic button"
        onClick={() => onSort('Status')}
      >
        Sort by Status
      </button>
      <button
        type="button"
        className="ui negative basic button"
        onClick={() => onSort('Reset')}
      >
        Reset
      </button>
    </div>
  );
}

Buttons.propTypes = {
  onSort: PropTypes.func.isRequired,
};

export default Buttons;
