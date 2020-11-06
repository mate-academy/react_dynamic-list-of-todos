import React from 'react';
import PropTypes from 'prop-types';
import Input from './Input/Input';
import Select from './Select/Select';

const SearchTodo = ({ handleChange, search, visibleTodos }) => (
  <div className="form-group">
    <Input
      handleChange={handleChange}
      search={search}
    />
    <Select
      handleChange={handleChange}
      visibleTodos={visibleTodos}
    />
  </div>
);

SearchTodo.propTypes = {
  handleChange: PropTypes.func.isRequired,
  search: PropTypes.string.isRequired,
  visibleTodos: PropTypes.string.isRequired,
};

export default React.memo(SearchTodo);
