import React from 'react';
import PropTypes from 'prop-types';
import './Filters.scss';

export const Filters = ({
  filterStatus,
  filterTitle,
  filters,
  handleChange,
  handleBtn,
}) => {
  const filtersKeys = Object.keys(filters);

  return (
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
        {filtersKeys.map(filterKey => (
          <option key={filterKey}>{filters[filterKey]}</option>
        ))}
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
};

Filters.propTypes = {
  filterStatus: PropTypes.string.isRequired,
  filterTitle: PropTypes.string.isRequired,
  filters: PropTypes.objectOf(PropTypes.string).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBtn: PropTypes.func.isRequired,
};
