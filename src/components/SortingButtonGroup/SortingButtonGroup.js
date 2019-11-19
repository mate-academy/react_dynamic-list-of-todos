import React from 'react';
import PropTypes from 'prop-types';

const SortingButtonGroup = props => (
  <>
    <button
      type="button"
      onClick={props.changeSortingType}
      data-sorting-type="title"
    >
        Sort by title
    </button>
    <button
      type="button"
      onClick={props.changeSortingType}
      data-sorting-type="user"
    >
        Sort by user
    </button>
    <button
      type="button"
      onClick={props.changeSortingType}
      data-sorting-type="completed"
    >
        Sort by status
    </button>
  </>
);

SortingButtonGroup.propTypes = {
  changeSortingType: PropTypes.func,
};

SortingButtonGroup.defaultProps = {
  changeSortingType: {},
};

export default SortingButtonGroup;
