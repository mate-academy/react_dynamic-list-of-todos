import React from 'react';
import PropTypes from 'prop-types';

const Select = ({ handleChange, visibleTodos }) => (
  <label>
    <select
      name="visibleTodos"
      value={visibleTodos}
      className="form-control"
      onChange={handleChange}
    >
      <option value="All">All</option>
      <option value="Completed">Completed</option>
      <option value="Active">Active</option>
    </select>
  </label>
);

Select.propTypes = {
  handleChange: PropTypes.func.isRequired,
  visibleTodos: PropTypes.string.isRequired,
};

export default Select;
