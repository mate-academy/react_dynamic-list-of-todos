import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '../Input';
import { Select } from '../Select';
import './FilterForm.scss';

export const FilterForm = (props) => {
  const { searchValue, selectValue, selectFilter, search } = props;

  return (
    <form
      className="filter-form"
    >
      <Input
        searchValue={searchValue}
        search={search}
      />

      <Select
        selectValue={selectValue}
        selectFilter={selectFilter}
      />
    </form>
  );
};

FilterForm.propTypes = {
  searchValue: PropTypes.string.isRequired,
  selectValue: PropTypes.string.isRequired,
  search: PropTypes.func.isRequired,
  selectFilter: PropTypes.func.isRequired,
};
