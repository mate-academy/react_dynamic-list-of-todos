import React from 'react';
import PropTypes from 'prop-types';
import './SearchInput.scss';

export const SearchInput = ({ handleChange, search, showTodo }) => (
  <div>
    <label>
      {`Search: `}
      <input
        type="text"
        onChange={handleChange}
        name="search"
        value={search}
        className="position"
      />
    </label>

    <select
      name="showTodo"
      value={showTodo}
      onChange={handleChange}
      className="position"
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="active">Active</option>
    </select>

  </div>
);

SearchInput.propTypes = {
  search: PropTypes.string.isRequired,
  showTodo: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
