import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ searchValue, search }) => (
  <input
    type="text"
    className="filter-form__input"
    value={searchValue}
    placeholder="Search"
    onChange={search}
  />
);

Input.propTypes = {
  searchValue: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
};
