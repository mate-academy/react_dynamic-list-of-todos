import React from 'react';
import PropTypes from 'prop-types';

export function Form({ input, select, handleChange }) {
  return (
    <>
      <input
        name="input"
        type="text"
        value={input}
        onChange={event => handleChange(event)}
      />

      <select
        name="select"
        value={select}
        onChange={event => handleChange(event)}
      >
        <option value="All">All</option>
        <option value="Active">Active</option>
        <option value="Completed">Completed</option>
      </select>
    </>
  );
}

Form.propTypes = {
  input: PropTypes.string.isRequired,
  select: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
