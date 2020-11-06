import React from 'react';
import PropTypes from 'prop-types';
import { SearchField } from '../SearchField';
import { SelectTodos } from '../SelectTodos';
import { Button } from '../Button';

export const FilterField = ({
  search,
  handleChange,
  shownTodos,
  shuffleTodos,
}) => (
  <div className="TodoList__filter-field">
    <SearchField
      search={search}
      handleChange={handleChange}
    />

    <SelectTodos
      handleChange={handleChange}
      shownTodos={shownTodos}
    />

    <Button
      shuffleTodos={shuffleTodos}
    />
  </div>
);

FilterField.propTypes = {
  search: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  shuffleTodos: PropTypes.func.isRequired,
  shownTodos: PropTypes.string.isRequired,
};
