import React from 'react';
import PropTypes from 'prop-types';

export const Form = ({
  value,
  search,
  handleChange,
}) => (
  <form className="form__group field">
    <input
      value={search}
      onChange={handleChange}
      type="input"
      className="form__field"
      placeholder="Name"
      name="search"
      id="search"
    />
    <label
      htmlFor="search"
      className="form__label"
    >
      Search
    </label>
    <select
      className="TodoList__filter"
      name="value"
      value={value}
      onChange={handleChange}
    >
      <option value="all">All</option>
      <option value="0">Active</option>
      <option value="1">Completed</option>
    </select>
  </form>
);

Form.propTypes = {
  value: PropTypes.string.isRequired,
  search: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
};
