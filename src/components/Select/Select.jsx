import React from 'react';
import PropTypes from 'prop-types';

export const Select = ({ handleStatus }) => (
  <select className="ui selection dropdown" onChange={handleStatus}>
    <option value="">
      All
    </option>
    <option value="false">
      Active
    </option>
    <option value="true">
      Completed
    </option>
  </select>
);

Select.propTypes = {
  handleStatus: PropTypes.func.isRequired,
};
