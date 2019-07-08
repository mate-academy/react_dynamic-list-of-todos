import React from 'react';
import PropTypes from 'prop-types';
import Sort from './Sort';

const ColumnHead = ({ todos, sortStatus, updateAppState, columnName }) => (
  <div
    className="todo-row--head"
    onClick={Sort.bind(null, columnName, todos, sortStatus, updateAppState)}
  >
    {columnName}
  </div>
);

ColumnHead.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape({
    title: PropTypes.string,
    completed: PropTypes.bool,
    user: PropTypes.shape({
      name: PropTypes.string,
    }),
  })).isRequired,
  sortStatus: PropTypes.number.isRequired,
  updateAppState: PropTypes.func.isRequired,
  columnName: PropTypes.string.isRequired,
};

export default ColumnHead;
