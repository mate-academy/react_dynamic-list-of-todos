import React from 'react';
import PropTypes from 'prop-types';

export const TodoSearch = ({ searchHandler }) => (
  <input
    className="TodoList__search"
    type="text"
    placeholder="Type search word"
    onChange={searchHandler}
  />
);

TodoSearch.propTypes = {
  searchHandler: PropTypes.func.isRequired,
};
