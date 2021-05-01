import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ setSearchValue, setSelectorValue, searchValue,
  search, filtered, shuffle }) => (
    <>
      <input
        type="text"
        placeholder="Search by title"
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e);
          search(e.target.value);
        }}
      />
      <select
        onChange={(e) => {
          setSelectorValue(e);
          filtered(e.target.value, searchValue);
        }}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
      <button
        type="button"
        onClick={shuffle}
      >
        Random it!
      </button>
    </>
);

Input.propTypes = {
  searchValue: PropTypes.string.isRequired,
  setSearchValue: PropTypes.func.isRequired,
  setSelectorValue: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  filtered: PropTypes.func.isRequired,
  shuffle: PropTypes.func.isRequired,
};
