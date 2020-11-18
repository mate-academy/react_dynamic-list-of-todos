import React from 'react';
import PropTypes from 'prop-types';
import './Search.scss';

export const Search = ({ checkQuery }) => (
  <div className="ui input">
    <input
      type="text"
      placeholder="Type search task"
      onChange={checkQuery}
    />
  </div>
);

Search.propTypes = {
  checkQuery: PropTypes.func.isRequired,
};
