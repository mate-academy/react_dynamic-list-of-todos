import React, { FC } from 'react';
import './App.css';
import { Todoitem } from './TodoItem';

interface Props {
  todos: TodoWithUser[];
}

export const Todolist: FC<Props> = ({ todos }) => (

  <table className="table box table-bordered table-hover">
    <thead className="thead-dark">
      <tr>
        <th scope="col">Title</th>
        <th scope="col">Status</th>
        <th scope="col">User Name</th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <Todoitem
          key={todo.id}
          todo={todo}
        />
      ))}
    </tbody>
  </table>
);
