import React from 'react';
import PropTypes from 'prop-types';

export const Form = ({ defaultSelect, inputTitle, handleChange }) => (
  <form>
    <input
      type="text"
      name="inputTitle"
      value={inputTitle}
      placeholder="filter todos"
      onChange={handleChange}
    />

    <select
      name="defaultSelect"
      value={defaultSelect}
      onChange={handleChange}
    >
      <option>all</option>
      <option>completed</option>
      <option>active</option>
    </select>
  </form>
);

Form.propTypes = {
  defaultSelect: PropTypes.string.isRequired,
  inputTitle: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
