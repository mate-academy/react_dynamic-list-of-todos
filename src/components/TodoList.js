import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';

const TodoList = ({ todos }) => (
  <table className="center">
    <thead>
      <tr>
        <th>ID</th>
        <th>Status</th>
        <th>Title</th>
        <th>User</th>
      </tr>
    </thead>
    <tbody>
      {(todos).map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </tbody>
  </table>
);

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default TodoList;
