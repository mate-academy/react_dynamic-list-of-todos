import React from 'react';
import PropTypes from 'prop-types';

const TodoForm = ({ onChangeHandler, onSelectHandler, inputValue }) => (
  <div className="ui form">
    <div className="two fields">
      <div className="field">
        <label>
          Title
          <input
            placeholder="Enter task title"
            type="text"
            value={inputValue}
            onChange={onChangeHandler}
          />
        </label>
      </div>
      <div className="field">
        <label>
          Select status
          <select
            onChange={onSelectHandler}
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
        </label>
      </div>
    </div>
  </div>
);

TodoForm.propTypes = {
  onChangeHandler: PropTypes.func.isRequired,
  onSelectHandler: PropTypes.func.isRequired,
  inputValue: PropTypes.string.isRequired,
};
export default TodoForm;
