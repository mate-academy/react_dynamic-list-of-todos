import React, { FC } from 'react';
import { Todo } from '../Todo/Todo';

interface Props {
  todos: PreparedTodo[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>User</th>
          <th>Task</th>
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
