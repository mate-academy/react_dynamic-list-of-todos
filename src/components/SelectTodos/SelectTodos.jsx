import React from 'react';
import PropTypes from 'prop-types';

export const SelectTodos = ({ handleChange, shownTodos }) => (
  <select
    value={shownTodos}
    name="shownTodos"
    onChange={handleChange}
  >
    <option value="all">All</option>
    <option value="completed">Completed</option>
    <option value="active">Active</option>
  </select>
);

SelectTodos.propTypes = {
  handleChange: PropTypes.func.isRequired,
  shownTodos: PropTypes.string.isRequired,
};
