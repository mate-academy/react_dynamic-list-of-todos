import React from 'react';
import PropTypes from 'prop-types';

const ArrowType = ({ state }) => (
  state.direction === 1
    ? <div className="arrow arrow-down" />
    : <div className="arrow arrow-up" />
);

ArrowType.propTypes = {
  state: PropTypes.shape({
    direction: PropTypes.number.isRequired,
  }).isRequired,
};

export default ArrowType;
