import React from 'react';
import PropTypes from 'prop-types';

export const Select = ({ valueOnSelect, filterBySelect }) => (
  <select
    className="TodoList__select"
    name="valueOnSelect"
    value={valueOnSelect}
    onChange={filterBySelect}
  >
    <option
      value="all"
    >
      All
    </option>
    <option
      value="not completed"
    >
      Active
    </option>
    <option
      value="completed"
    >
      Completed
    </option>
  </select>
);

Select.propTypes = {
  valueOnSelect: PropTypes.string.isRequired,
  filterBySelect: PropTypes.func.isRequired,
};
