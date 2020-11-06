import React from 'react';
import PropTypes from 'prop-types';

export const Form = ({ search, filter, handleChange }) => (
  <form className="Form">
    <label htmlFor="search">
      <input
        className="Form__input"
        name="search"
        id="search"
        type="search"
        placeholder="Search"
        value={search}
        onChange={handleChange}
      />
    </label>
    <label htmlFor="filter">
      <select
        className="Form__select"
        name="filter"
        id="filter"
        value={filter}
        onChange={handleChange}
      >
        <option value="all">
          All
        </option>
        <option value="active">
          Active
        </option>
        <option value="completed">
          Completed
        </option>
      </select>
    </label>
  </form>
);

Form.propTypes = {
  filter: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
