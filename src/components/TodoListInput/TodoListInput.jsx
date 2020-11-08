import React from 'react';
import PropTypes from 'prop-types';

export const TodoListInput = ({
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

TodoListInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  selectValue: PropTypes.string.isRequired,
};
