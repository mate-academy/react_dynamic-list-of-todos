import React, { FC } from 'react';
import { TodoItem } from './TodoItem';
import { PreparedTodo } from '../utils/interfaces';


interface Props {
  todos: PreparedTodo[];
  filter: (option: string) => void;
}

export const TodoList: FC<Props> = ({ todos, filter }) => (
  <table>
    <thead>
      <tr>
        <th onClick={() => filter('id')}>
          No
        </th>
        <th onClick={() => filter('username')}>
          Name
        </th>
        <th onClick={() => filter('title')}>
          Title
        </th>
        <th onClick={() => filter('completed')}>
          Status
        </th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </tbody>
  </table>
);
