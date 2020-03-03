import React from 'react';
import { Todo } from './Todo';

interface Props {
  todos: PreparedTodo[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <table className="table-sm table-dark main-table table-center">
      <thead>
        <tr>
          <th>ID</th>
          <th>Todo</th>
          <th>Status</th>
          <th>UserName</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(item => <Todo key={item.id} {...item} />)}
      </tbody>
    </table>
  );
};
