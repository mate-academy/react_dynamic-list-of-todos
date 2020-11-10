import React from 'react';
import './Form.scss';
import PropTypes from 'prop-types';

const Form = ({ onSearch, onComplete }) => (
  <form className="TodoList__form">
    <input
      type="text"
      id="search-query"
      className="TodoList__enter"
      placeholder="Enter"
      onChange={onSearch}
    />

    <select
      name="todosFilter"
      onChange={onComplete}
    >
      <option value="all">
        All todos
      </option>
      <option value="active">
        Active todos
      </option>
      <option value="completed">
        Completed todos
      </option>
    </select>

  </form>
);

Form.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export { Form };
