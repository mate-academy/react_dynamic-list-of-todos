import React from 'react';
import { FilterOfTodosShape } from '../Shapes/FilterOfTodosShape';

export const FilterOfTodos = ({ filterText, handleChange, showedTodos }) => (
  <div>
    <input
      placeholder="Search"
      name="filterText"
      value={filterText}
      onChange={handleChange}
    />

    <select
      name="showedTodos"
      value={showedTodos}
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
  </div>
);

FilterOfTodos.propTypes = FilterOfTodosShape;
