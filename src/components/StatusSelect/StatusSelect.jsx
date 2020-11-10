import React from 'react';
import PropTypes from 'prop-types';

export const StatusSelect = ({ selectedStatus, handleSelect }) => (
  <select
    className="TodoList__select"
    value={selectedStatus}
    onChange={handleSelect}
  >
    <option value="all" defaultValue>all</option>
    <option value="active">active</option>
    <option value="completed">completed</option>
  </select>
);

StatusSelect.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  selectedStatus: PropTypes.string.isRequired,
};
