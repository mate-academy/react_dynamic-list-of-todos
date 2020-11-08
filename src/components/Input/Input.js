import React from 'react';
import { InputShape } from './InputShape';

export const Input = ({ value, handleChange }) => (
  <label>
    <input
      type="text"
      className="TodoList__input"
      placeholder="write name of title, please"
      name="searchValue"
      value={value}
      onChange={handleChange}
    />
  </label>
);

Input.propTypes = InputShape;
