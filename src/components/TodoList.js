import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ sortedTodos, sorting }) => (
  <table>
    <thead>
      <tr>
        <th
          style={{ cursor: 'pointer' }}
          onClick={() => {
            sorting('id');
          }}
        >
          ID
        </th>

        <th
          style={{ cursor: 'pointer' }}
          onClick={() => {
            sorting('title');
          }}
        >
          Title
        </th>

        <th
          style={{ cursor: 'pointer' }}
          onClick={() => {
            sorting('user');
          }}
        >
          User
        </th>
        <th
          style={{ cursor: 'pointer' }}
          onClick={() => {
            sorting('completed');
          }}
        >
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
