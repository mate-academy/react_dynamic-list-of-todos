import React from 'react';
import PropTypes from 'prop-types';

export const Form = ({ inputTitle, defaultSelect, handleInput }) => (
  <form className="TodoList__form">
    <input
      className="TodoList__input"
      label="Search todos"
      name="inputTitle"
      id="outline-size-small"
      value={inputTitle}
      onChange={handleInput}
    />
    <select
      className="TodoList__select"
      name="defaultSelect"
      value={defaultSelect}
      onChange={handleInput}
    >
      <option value="Show All">
        Show All
      </option>
      <option value="Show Completed">
        Show Completed
      </option>
      <option value="Show Active">
        Show Active
      </option>
    </select>
  </form>
);

Form.propTypes = {
  inputTitle: PropTypes.string.isRequired,
  defaultSelect: PropTypes.string.isRequired,
  handleInput: PropTypes.func.isRequired,
};
