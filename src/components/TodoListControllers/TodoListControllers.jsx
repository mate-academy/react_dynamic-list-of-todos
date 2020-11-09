import React from 'react';
import PropTypes from 'prop-types';

export const TodoListControllers = ({
  handleChange,
  searchValue,
  selectValue,
}) => (
  <>
    <label>
      <span>
        {`Search todo: `}
      </span>
      <input
        name="search"
        type="text"
        value={searchValue}
        onChange={handleChange}
      />
    </label>

    <label>
      <select
        name="visibleTodos"
        onChange={handleChange}
        value={selectValue}
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
  </>
);

TodoListControllers.propTypes = {
  handleChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  selectValue: PropTypes.string.isRequired,
};
