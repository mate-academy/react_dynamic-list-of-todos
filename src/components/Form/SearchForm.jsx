import React from 'react';
import PropTypes from 'prop-types';

export const SearchForm = ({
  searchTitle,
  filterTodoByTitle,
  handleChange,
}) => (
  <form>
    <label
      htmlFor="title"
      className="label"
    >
      Search title
    </label>
    <input
      type="text"
      placeholder="Enter the title"
      id="title"
      className="input is-normal"
      value={searchTitle}
      onChange={(event) => {
        filterTodoByTitle(event);
      }}
    />
    <select
      className="select is-info"
      onChange={(event) => {
        handleChange(event);
      }}
    >
      <option
        value="All"
      >
        All
      </option>
      <option
        value="Active"
      >
        Active
      </option>
      <option
        value="Completed"
      >
        Complete
      </option>
    </select>
  </form>
);

SearchForm.propTypes = {
  searchTitle: PropTypes.string.isRequired,
  filterTodoByTitle: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
};
