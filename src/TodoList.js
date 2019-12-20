import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos, sortTodos }) => (
  <table>
    <tbody>
      <tr>
        <th onClick={() => sortTodos('id')}>
          ID
        </th>
        <th onClick={() => sortTodos('title')}>
          Title
        </th>
        <th onClick={() => sortTodos('user')}>
          User
        </th>
        <th onClick={() => sortTodos('status')}>
          Status
        </th>
      </tr>
      {todos.map(todo => <TodoItem todo={todo} key={todo.id} />)}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortTodos: PropTypes.func.isRequired,
};

export default TodoList;
