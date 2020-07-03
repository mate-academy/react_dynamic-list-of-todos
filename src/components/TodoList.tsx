import React, { FC } from 'react';
import { TodoItem } from './TodoItem';
import { PreparedTodo } from '../utils/interfaces';


interface Props {
  todos: PreparedTodo[];
  filter: (option: string) => void;
}

export const TodoList: FC<Props> = ({ todos, filter }) => (
  <table className="table">
    <thead className="table__head">
      <tr className="table__row">
        <th className="table__heading" onClick={() => filter('id')}>
          No
        </th>
        <th className="table__heading" onClick={() => filter('username')}>
          Name
        </th>
        <th className="table__heading" onClick={() => filter('title')}>
          Title
        </th>
        <th className="table__heading" onClick={() => filter('completed')}>
          Status
        </th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => <TodoItem key={todo.id} todo={todo} />)}
    </tbody>
  </table>
);
