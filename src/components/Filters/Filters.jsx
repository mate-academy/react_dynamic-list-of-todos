import React from 'react';
import PropTypes from 'prop-types';
import './Filters.scss';

export const Filters = ({
  filterStatus,
  filterTitle,
  handleChange,
  handleBtn,
}) => (
  <form className="TodoList__list-filters">
    <input
      type="text"
      name="filterTitle"
      value={filterTitle}
      placeholder="filter todos"
      onChange={handleChange}
    />

    <select
      name="filterStatus"
      value={filterStatus}
      onChange={handleChange}
    >
      <option>All</option>
      <option>Active</option>
      <option>Completed</option>
    </select>

    <button
      type="button"
      className="button"
      onClick={handleBtn}
    >
      Randomize
    </button>
  </form>
);

Filters.propTypes = {
  filterStatus: PropTypes.string.isRequired,
  filterTitle: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBtn: PropTypes.func.isRequired,
};
