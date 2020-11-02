import React from 'react';
import PropTypes from 'prop-types';
import './FilterForm.scss';

export const FilterForm = (props) => {
  const { searchValue, selectValue, selectFilter, search } = props;

  return (
    <form
      className="filter-form"
    >
      <input
        type="text"
        className="filter-form__input"
        value={searchValue}
        placeholder="Search"
        onChange={search}
      />

      <select
        name="filter"
        value={selectValue}
        className="filter-form__select"
        onChange={selectFilter}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">completed</option>
      </select>
    </form>
  );
};

FilterForm.propTypes = {
  searchValue: PropTypes.string.isRequired,
  selectValue: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  selectFilter: PropTypes.func.isRequired,
};
