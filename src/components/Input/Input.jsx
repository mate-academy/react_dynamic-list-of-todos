import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

export const Input = ({ valueOnInput, filterOnInput }) => (
  <input
    className="input"
    type="text"
    name="valueOnInput"
    placeholder="Title"
    value={valueOnInput}
    onChange={filterOnInput}
  />
);

Input.propTypes = {
  valueOnInput: PropTypes.string.isRequired,
  filterOnInput: PropTypes.func.isRequired,
};
