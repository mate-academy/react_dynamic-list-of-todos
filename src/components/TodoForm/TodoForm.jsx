import React from 'react';
import PropTypes from 'prop-types';

const TodoForm = ({ onChangeHandler, onSelectHandler }) => (
  <div className="ui form">
    <div className="two fields">
      <div className="field">
        <label>
          Title
          <input
            placeholder="Enter task title"
            type="text"
            onChange={event => onChangeHandler(event)}
          />
        </label>
      </div>
      <div className="field">
        <label>
          Select status
          <select onChange={event => onSelectHandler(event)}>
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
        </label>
      </div>
    </div>
  </div>
);

TodoForm.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  onSelectHandler: PropTypes.func.isRequired,
};
export default TodoForm;
