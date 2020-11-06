import React from 'react';
import PropTypes from 'prop-types';

export const Select = ({ selectValue, selectFilter }) => {
  const options = ['all', 'active', 'completed'];

  return (
    <select
      name="filter"
      value={selectValue}
      className="filter-form__select"
      onChange={selectFilter}
    >
      {
        options.map(option => (
          <option
            key={option}
            value={option}
          >
            {option[0].toUpperCase() + option.slice(1)}
          </option>
        ))
      }

    </select>
  );
};

Select.propTypes = {
  selectValue: PropTypes.string.isRequired,
  selectFilter: PropTypes.func.isRequired,
};
