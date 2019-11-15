import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ visibleTable }) {
  return (
    <table className="todo ui celled table">
      <thead className="thead">
        <tr>
          <th>Item</th>
          <th>User</th>
          <th>Completeness</th>
        </tr>
      </thead>
      <tbody>
        {visibleTable.map(todo => <TodoItem todo={todo} key={todo.id} />)}
      </tbody>
    </table>
  );
}

export default TodoList;
