import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';

export const Form = ({ query, setQuery, todoStatus, setTodoStatus }) => (
  <form action="post">
    <input
      className="input-group-text"
      type="text"
      placeholder="Find todo"
      value={query}
      onChange={({ target }) => setQuery(target.value)}
    />

    <select
      className="input-group-text"
      value={todoStatus}
      onChange={setTodoStatus}
    >
      <option value="all">All</option>
      <option value="active">Active</option>
      <option value="completed">Completed</option>
    </select>
  </form>
);

Form.propTypes = {
  query: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
  todoStatus: PropTypes.string.isRequired,
  setTodoStatus: PropTypes.func.isRequired,
};
