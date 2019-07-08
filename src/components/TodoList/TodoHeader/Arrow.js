import React from 'react';
import PropTypes from 'prop-types';
import ArrowType from './ArrowType';

const Arrow = ({ state, sortType }) => (
  state.sortType === sortType
    ? <ArrowType state={state} />
    : ''
);

Arrow.propTypes = {
  state: PropTypes.shape({
    sortType: PropTypes.string.isRequired,
  }).isRequired,
  sortType: PropTypes.string.isRequired,
};

export default Arrow;
