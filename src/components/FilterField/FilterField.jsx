import React from 'react';
import PropTypes from 'prop-types';

export const FilterField = ({
  search,
  handleChange,
  shownTodos,
  shuffleTodos,
}) => (
  <div className="TodoList__filter-field">
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

    <select
      value={shownTodos}
      name="shownTodos"
      onChange={handleChange}
    >
      <option value="all">All</option>
      <option value="completed">Completed</option>
      <option value="active">Active</option>
    </select>

    <button
      type="button"
      className="button TodoList__user-button--selected"
      onClick={shuffleTodos}
    >
      Shuffle
    </button>
  </div>
);

FilterField.propTypes = {
  search: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  shuffleTodos: PropTypes.func.isRequired,
  shownTodos: PropTypes.string.isRequired,
};
