import React from 'react';
import PropTypes from 'prop-types';

const Input = ({ handleChange, search }) => (
  <label>
    Search todo
    <input
      type="text"
      className="form-control"
      placeholder="Search..."
      name="search"
      value={search}
      onChange={handleChange}
    />
  </label>
);

Input.propTypes = {
  handleChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
};

export default Input;
