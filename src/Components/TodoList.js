import React from 'react';
import PropTypes from 'prop-types';

import TodoItem from './TodoItem';

function TodoList(props) {
  return (
    <table className="todo-list-table">
      <thead>
        <tr className="todo-list-table__titles">
          <th data-sort-type="name" data-column="0">User Info</th>
          <th data-sort-type="items" data-column="1">Tasks</th>
        </tr>
      </thead>
      <tbody className="todo-list-table__tasks">
        <TodoItem todos={props.todosData} />
      </tbody>
    </table>
  );
}

TodoList.propTypes = {
  todosData: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TodoList;
