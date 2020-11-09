import React from 'react';
import { FilterProps } from '../../props/FilterProps';
import './Filter.scss';

export const Filter = ({
  filterText,
  handleChange,
  handleChangeFilterText,
  showedTodos,
}) => (
  <div className="filter">
    <input
      className="ui input"
      placeholder="Search..."
      name="filterText"
      value={filterText}
      onChange={handleChangeFilterText}
    />

    <select
      className="ui selection dropdown"
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

Filter.propTypes = FilterProps;
