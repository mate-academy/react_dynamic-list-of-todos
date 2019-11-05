import React from 'react';
import PropTypes from 'prop-types';

const SortButtons = ({ changeSortMethod }) => (
  <>
    <button
      type="button"
      onClick={() => changeSortMethod('Sort by todo Id')}
    >
      Sort by todo Id
    </button>
    <button
      type="button"
      onClick={() => changeSortMethod('Sort by todo title')}
    >
      Sort by todo title
    </button>
    <button
      type="button"
      onClick={() => changeSortMethod('Show undone todos first')}
    >
      Show undone todos first
    </button>
    <button
      type="button"
      onClick={() => changeSortMethod('Sort by executant name')}
    >
      Sort by executant name
    </button>
  </>
);

SortButtons.propTypes = {
  changeSortMethod: PropTypes.func.isRequired,
};

export default SortButtons;
