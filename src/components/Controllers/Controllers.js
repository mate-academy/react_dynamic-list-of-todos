import React from 'react';
import { ControllersProps } from '../../props/ControllersProps';
import './Controllers.scss';

export const Controllers = ({ filterQuery, handleChange, selectValue }) => (
  <div className="Controllers">
    <input
      className="Controllers__input"
      placeholder="Enter todo"
      name="filterQuery"
      value={filterQuery}
      onChange={handleChange}
    />

    <select
      className="Controllers__select"
      name="selectValue"
      value={selectValue}
      onChange={handleChange}
    >
      <option value="all">all</option>
      <option value="active">active</option>
      <option value="completed">completed</option>
    </select>
  </div>
);

Controllers.propTypes = ControllersProps;
