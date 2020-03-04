import React, { FC } from 'react';

interface Props {
  todos: TodoWithUser[];
}

export const TodoItem: FC<Props> = ({ todos }) => (
  <table>
    <thead>
      <tr>
        <th>
        USER
        </th>
        <th>
        TITLE
        </th>
        <th>
        COMPLETED
        </th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <tr key={todo.id}>
          <td>
            {todo.user.name}
          </td>
          <td>
            {todo.title}
          </td>
          <td>
            {todo.completed ? 'Done' : 'In process'}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);
