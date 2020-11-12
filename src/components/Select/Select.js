import React from 'react';
import { SelectShape } from './SelectShape';

export const Select = ({ value, handleChange }) => (
  <label>
    <select
      name="showedTodos"
      value={value}
      className="TodoList__select"
      onChange={handleChange}
    >
      <option value="">
        All
      </option>
      <option value="completed">
        Completed
      </option>
      <option value="active">
        Active
      </option>
    </select>
  </label>
);

Select.propTypes = SelectShape;
