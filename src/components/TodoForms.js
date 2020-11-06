import React from 'react';
import PropTypes from 'prop-types';

export const TodoForms = ({ handleSelect, query, search }) => (
  <form>
    <input
      className="TodoList__input ui selection dropdown"
      type="text"
      value={query}
      onChange={search}
    />

    <select
      onChange={handleSelect}
      className="TodoList__select ui selection dropdown"
    >
      <option value="all">all</option>
      <option value="active">active</option>
      <option value="completed">completed</option>
    </select>
  </form>
);

export const shapeTodoForms = {
  handleSelect: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
}.isRequired;

TodoForms.propTypes = shapeTodoForms;
