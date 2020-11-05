import React from 'react';
import PropTypes from 'prop-types';
import './Search.scss';

export const Search = ({ checkQuery }) => (
  <input
    type="text"
    placeholder="Type search task"
    onChange={checkQuery}
  />
);

Search.propTypes = {
  checkQuery: PropTypes.func.isRequired,
};
