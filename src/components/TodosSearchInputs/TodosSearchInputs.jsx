import React from 'react';
import PropTypes from 'prop-types';

export const TodosSearchInputs = ({ inputValue, selectValue, handleChange }) => (
  <div className="TodoList__inputs-container">
    <input
      className="TodoList__input"
      placeholder="Search"
      name="inputValue"
      value={inputValue}
      onChange={e => handleChange(e)}
    />

    <select
      className="TodoList__input"
      value={selectValue}
      name="selectValue"
      onChange={e => handleChange(e)}
    >
      <option>All</option>
      <option>Active</option>
      <option>Completed</option>
    </select>
  </div>
)

TodosSearchInputs.propTypes = {
  inputValue: PropTypes.string || '',
  selectValue: PropTypes.string || '',
  handleChange: PropTypes.func.isRequired,
}