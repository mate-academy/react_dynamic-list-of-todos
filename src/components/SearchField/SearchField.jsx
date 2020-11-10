import React from 'react';
import PropTypes from 'prop-types';

export const SearchField = ({ search, handleChange }) => (
  <label>
    {`Search: `}
    <input
      type="text"
      name="search"
      value={search}
      onChange={handleChange}
      autoComplete="off"
    />
  </label>
);

SearchField.propTypes = {
  search: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
