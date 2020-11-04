import React from 'react';
import PropTypes from 'prop-types';

const SearchTodo = ({ handleChange, search, visibleTodos }) => (
  <div className="form-group">
    <label>
      Search todo
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        name="search"
        value={search}
        onChange={handleChange}
      />
    </label>
    <label>
      <select
        name="visibleTodos"
        value={visibleTodos}
        className="form-control"
        onChange={handleChange}
      >
        <option value="All">All</option>
        <option value="Completed">Completed</option>
        <option value="Active">Active</option>
      </select>
    </label>

  </div>
);

SearchTodo.propTypes = {
  handleChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  visibleTodos: PropTypes.string.isRequired,
};

export default React.memo(SearchTodo);
