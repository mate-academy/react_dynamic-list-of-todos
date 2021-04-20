import React from 'react';
import PropTypes from 'prop-types';
import './ControlPanel.scss';

export const ControlPanel = ({ searchText, status, updateTodos }) => (
  <div className="ControlPanel__controls">
    <input
      className="ControlPanel__input"
      type="text"
      value={searchText}
      onChange={(e) => {
        updateTodos('searchText', e.target.value);
      }}
    />
    <select
      name="filter"
      id="filter"
      className="ControlPanel__select"
      value={status}
      onChange={(e) => {
        updateTodos('status', e.target.value);
      }}
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>
  </div>
);

ControlPanel.propTypes = {
  searchText: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  updateTodos: PropTypes.func.isRequired,
};
