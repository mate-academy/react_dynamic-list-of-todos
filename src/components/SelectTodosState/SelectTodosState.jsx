import React from 'react';
import PropTypes from 'prop-types';

export const SelectTodosState = ({ selectTodos }) => (
  <select onChange={selectTodos}>
    <option value="all">All</option>
    <option value="completed">Completed</option>
    <option value="uncompleted">Not completed</option>
  </select>
);

SelectTodosState.propTypes = {
  selectTodos: PropTypes.func.isRequired,
};
