import React from 'react';
import PropTypes from 'prop-types';
import './TodoListControllers.scss';

export const TodoListControllers = ({
  handleChange,
  searchValue,
  selectValue,
}) => (
  <>
    <label>
      <input
        name="search"
        type="text"
        placeholder="Search todo"
        value={searchValue}
        onChange={handleChange}
      />
    </label>

    <label>
      <select
        name="visibleTodos"
        value={selectValue}
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
  </>
);
TodoListControllers.propTypes = {
  handleChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  selectValue: PropTypes.string.isRequired,
};
