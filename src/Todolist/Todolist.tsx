import React, { FC } from 'react';
import { Todoitem } from '../Todoitem/Todoitem';

interface Props {
  todos: TodoWithUser[];
}

export const Todolist: FC<Props> = ({ todos }) => (

  <table className="container">
    <thead>
      <tr>
        <th>id</th>
        <th>title</th>
        <th>status</th>
        <th>user</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <Todoitem key={todo.id} todo={todo} />
      ))}
    </tbody>
  </table>

);
