import React from 'react';
import PropTypes from 'prop-types';

export const Input = ({ title, searchByTitle }) => (
  <label htmlFor="title">
    <input
      type="text"
      id="title"
      name="title"
      value={title}
      placeholder="Search by todo title..."
      onChange={searchByTitle}
    />
  </label>
);

Input.propTypes = {
  title: PropTypes.string.isRequired,
  searchByTitle: PropTypes.func.isRequired,
};
