import React from 'react';

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
      {todos.map(todo => (
        <TodoItem todo={todo} key={todo.id} />
      ))}
    </tbody>
  </table>
);

const TodoItem = ({ todo }) => (
  <tr>
    <td>{todo.id}</td>
    <td>{todo.completed ? '+' : '-' }</td>
    <td>{todo.title}</td>
    <td>{todo.user.name}</td>
  </tr>
);

export default TodoList
