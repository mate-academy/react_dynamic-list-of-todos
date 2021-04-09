import React from 'react';
import PropTypes from 'prop-types';

export const FormFilter = ({
  onHandleChange,
  changeSelectValue,
  inputValue,
}) => (
  <form>
    <input
      type="text"
      placeholder="Search by title"
      value={inputValue}

      onChange={(event) => {
        onHandleChange(event);
      }}
    />
    <select onChange={(event) => {
      changeSelectValue(event);
    }}
    >
      <option value="all">all</option>
      <option value="Active">Active</option>
      <option value="Complited">Complited</option>
    </select>

  </form>
);

FormFilter.propTypes = PropTypes.shape({
  onHandleChange: PropTypes.func.isRequired,
  changeSelectValue: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
}).isRequired;
