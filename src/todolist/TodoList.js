import React from 'react';
import PropTypes from 'prop-types';

import Buttons from '../buttons/Buttons';
import TodoTable from '../todoTable/TodoTable';

function TodoList({ onSort, table, sortMethod }) {
  return (
    <>
      <Buttons onSort={onSort} />
      <TodoTable table={table} sortMethod={sortMethod} />
    </>
  );
}

TodoList.propTypes = {
  onSort: PropTypes.func.isRequired,
  table: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortMethod: PropTypes.string.isRequired,
};

export default TodoList;
