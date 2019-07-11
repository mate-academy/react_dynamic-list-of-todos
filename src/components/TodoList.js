import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ sortedTodos, sorting }) => (
  <table>
    <thead>
      <tr>
        <th onClick={() => sorting('id')}>
          ID
        </th>

        <th onClick={() => sorting('title')}>
          Title
        </th>

        <th onClick={() => sorting('user')}>
          User
        </th>
        <th onClick={() => sorting('completed')}>
          Completed
        </th>
      </tr>
    </thead>
    <tbody>
      {
        sortedTodos.map(todo => (
          <TodoItem currentTodo={todo} />
        ))
      }
    </tbody>
  </table>
);

TodoList.propTypes = {
  sortedTodos: PropTypes.arrayOf.isRequired,
  sorting: PropTypes.func.isRequired,
};

export default TodoList;
