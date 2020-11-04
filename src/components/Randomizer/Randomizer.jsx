import React from 'react';
import PropTypes from 'prop-types';
import './Randomizer.scss';

export const Randomizer = ({ clickHandler }) => (
  <div className="randomizer">
    <button
      className="randomizer__button"
      onClick={clickHandler}
    >
      Random
    </button>
  </div>
);

Randomizer.propTypes = {
  clickHandler: PropTypes.func.isRequired,
};
