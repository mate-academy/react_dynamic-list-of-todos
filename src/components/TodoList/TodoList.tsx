import React from 'react';
import { Todo } from '../Todo/Todo';
import './TodoList.css';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList: React.FC<Props> = ({ todos }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Title</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {todos.map(todo => (
          <Todo key={todo.id} todo={todo} />
        ))}
      </tbody>
    </table>
  );
};
