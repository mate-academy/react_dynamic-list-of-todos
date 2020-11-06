import React from 'react';
import { FilterProps } from '../../props/FilterProps';
import './Filter.scss';

export const Filter = ({ filterText, handleChange, selectValue }) => (
  <div className="filter">
    <input
      className="ui input"
      placeholder="Search..."
      name="filterText"
      value={filterText}
      onChange={handleChange}
    />

    <select
      className="ui selection dropdown"
      name="selectValue"
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
  </div>
);

Filter.propTypes = FilterProps;
