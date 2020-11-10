import React from 'react';
import PropTypes from 'prop-types';

export function TodosSearch({ searchValue, handleChange }) {
  return (
    <input
      type="text"
      value={searchValue}
      name="searchValue"
      placeholder="Search..."
      onChange={handleChange}
    />
  );
}

TodosSearch.propTypes = {
  searchValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
