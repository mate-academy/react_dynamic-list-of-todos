import React, { FC } from 'react';
import { Todo } from './Todo';

interface Props {
  todos: TodoWithUser[];
}

export const TodoList: FC<Props> = ({ todos }) => {
  return (
    <table className="table table-striped table-dark">
      <thead>
        <tr>
          <th>№</th>
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
