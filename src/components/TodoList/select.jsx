import React from 'react';
import PropTypes from 'prop-types';

export function Select({ handleChange, select }) {
  return (
    <select
      value={select}
      name="select"
      onChange={handleChange}
    >
      <option>
        All
      </option>
      <option>
        Active
      </option>
      <option>
        Completed
      </option>
    </select>
  );
}

Select.propTypes = {
  handleChange: PropTypes.func.isRequired,
  select: PropTypes.string.isRequired,
};
