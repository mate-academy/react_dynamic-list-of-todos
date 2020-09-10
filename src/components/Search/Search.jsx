import React from 'react';
import PropTypes from 'prop-types';

export const Search = ({ text, selectValue, changeList }) => (
  <div>
    Search:
    <input
      name="input"
      value={text}
      onChange={changeList}
      type="text"
    />
    <select
      name="select"
      value={selectValue}
      onChange={changeList}
    >
      <option
        value="all"
      >
        All
      </option>
      <option
        value="active"
      >
        Active
      </option>
      <option
        value="completed"
      >
        Completed
      </option>
    </select>
  </div>
);

Search.propTypes = {
  text: PropTypes.string.isRequired,
  selectValue: PropTypes.string.isRequired,
  changeList: PropTypes.func.isRequired,
};
