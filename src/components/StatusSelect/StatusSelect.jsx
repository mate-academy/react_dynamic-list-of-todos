import React from 'react';
import PropTypes from 'prop-types';

export function StatusSelect({ selectedOption, handleSelect }) {
  return (
    <select
      className="TodoList__select"
      value={selectedOption}
      onChange={handleSelect}
    >
      <option value="all" defaultValue>all</option>
      <option value="active">active</option>
      <option value="completed">completed</option>
    </select>
  );
}

StatusSelect.propTypes = {
  handleSelect: PropTypes.func.isRequired,
  selectedOption: PropTypes.string.isRequired,
};
