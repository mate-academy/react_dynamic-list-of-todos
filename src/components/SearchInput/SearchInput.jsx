import React from 'react';
import PropTypes from 'prop-types';
import './SearchInput.scss';

export const SearchInput = ({ handleChange, filterQuery, status }) => (
  <div>
    <label>
      {`Search: `}
      <input
        type="text"
        onChange={handleChange}
        name="filterQuery"
        value={filterQuery}
        className="position"
      />
    </label>

    <select
      name="status"
      value={status}
      onChange={handleChange}
      className="position"
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="active">Active</option>
    </select>

  </div>
);

SearchInput.propTypes = {
  filterQuery: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
