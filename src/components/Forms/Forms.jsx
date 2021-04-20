import React from 'react';
import propTypes from 'prop-types';

export const Forms = ({ input, select, handleChange }) => (
  <>
    <input
      type="text"
      name="input"
      value={input}
      onChange={handleChange}
    />
    <select
      value={select}
      name="select"
      onChange={handleChange}
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>
  </>
);

Forms.propTypes = {
  input: propTypes.string.isRequired,
  select: propTypes.string.isRequired,
  handleChange: propTypes.func.isRequired,
};
