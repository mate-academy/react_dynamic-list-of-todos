import React from 'react';
import PropTypes from 'prop-types';
import { TodoPropType } from '../PropTypes/TodoPropType';

export const Inputs = ({ query, handleChange, visibleTodos }) => (
  <div className="TodoList__inputs">
    <label htmlFor="search">
      Search todo in list:
      <input
        type="text"
        id="search"
        className="TodoList__input"
        name="query"
        value={query}
        onChange={handleChange}
      />
    </label>

    <label htmlFor="visibletodos">
      Choose todos
      <select
        id="visibleTodos"
        name="visibleTodos"
        value={visibleTodos}
        onChange={handleChange}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>
    </label>
  </div>
);

Inputs.propTypes = {
  handleChange: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
  visibleTodos: PropTypes.arrayOf(
    PropTypes.shape(TodoPropType),
  ).isRequired,
};
