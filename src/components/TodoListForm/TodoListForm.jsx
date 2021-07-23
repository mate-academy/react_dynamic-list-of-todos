import React from 'react';
import PropTypes from 'prop-types';

export const TodoListForm = ({
  query,
  setSearchQuery,
  todoStatus,
  setTodoStatus,
}) => (
  <form className="box">
    <div className="field">
      <label htmlFor="search-query" className="label">
        Filter todos by title
      </label>

      <div className="control">
        <input
          type="text"
          id="search-query"
          className="input"
          value={query}
          placeholder="Type search word"
          onChange={setSearchQuery}
        />
      </div>
    </div>
    <div className="field">
      <label htmlFor="status-filter" className="label">
        Filter todos by status
      </label>

      <div className="control">
        <select
          value={todoStatus}
          onChange={setTodoStatus}
        >
          <option value="both">both</option>
          <option value="completed">completed</option>
          <option value="in-progress">in progress</option>
        </select>
      </div>
    </div>
  </form>
);

TodoListForm.propTypes = {
  query: PropTypes.string.isRequired,
  todoStatus: PropTypes.string.isRequired,
  setTodoStatus: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
};
