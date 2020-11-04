import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.scss'

export const SearchBar = ({ value, handleChange }) => (
  
  <div className="search-bar">
    <input
      type="text"
      name="query"
      id="search-query"
      className="search-bar__input"
      value={value}
      placeholder="Type search word"
      onChange={handleChange}
    />
  </div>
);

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
