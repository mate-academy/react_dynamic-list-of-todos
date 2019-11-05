import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ initialTable }) {
  return (
    <table className="todo ui celled table">
      <thead className="thead">
        <th>Item</th>
        <th>User</th>
        <th>Completeness</th>
      </thead>
      <tbody>
        {initialTable.map(todo => <TodoItem todo={todo} key={todo.id} />)}
      </tbody>
    </table>
  );
}

export default TodoList;
