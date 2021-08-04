import React from 'react';
import PropTypes from 'prop-types';

export const SearchField = ({
  handleFilterChange,
  query,
  status,
  handleChange,
}) => (
  <>
    <select
      className="form-select"
      aria-label="Default select example"
      name="status"
      onChange={handleChange}
      value={status}
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Complete</option>
    </select>
    <div className="box">
      <div className="field">
        <label htmlFor="search-query" className="label">
          Search todo
        </label>

        <div className="control">
          <input
            type="text"
            id="search-query"
            className="form-control"
            placeholder="Type search word"
            onChange={handleFilterChange}
            value={query}
          />
        </div>
      </div>
    </div>
  </>
);

SearchField.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
