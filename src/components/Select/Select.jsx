import React from 'react';
import PropTypes from 'prop-types';
import './Select.scss';

export const Select = ({ changeHandler }) => (
  <div className="select">
    <select
      className="select__bar"
      name="select"
      onChange={changeHandler}
    >
      <option value="All">All</option>
      <option value="Completed">Completed</option>
      <option value="Active">Active</option>
    </select>
  </div>

);

Select.propTypes = {
  changeHandler: PropTypes.func.isRequired,
};
