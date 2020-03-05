import React, { FC } from 'react';
import { Todo } from '../Todo/Todo';
import './TodoList.css';

interface Props {
  todos: TodoWithUser[];
  onSort: (option: string) => void;
}

export const TodoList: FC<Props> = ({
  todos,
  onSort,
}) => (
  <table className="todo-list">
    <thead>
      <tr className="todo-list__header">
        <th>
          <button
            type="button"
            className="todo-list__sort-btn"
          >
            Sort by Id
          </button>
        </th>
        <th>
          <button
            type="button"
            onClick={() => onSort('name')}
            className="todo-list__sort-btn"
          >
            Sort by User name
          </button>
        </th>
        <th>
          <button
            type="button"
            onClick={() => onSort('task')}
            className="todo-list__sort-btn"
          >
            Sort by task name
          </button>
        </th>
        <th>
          <button
            type="button"
            onClick={() => onSort('status')}
            className="todo-list__sort-btn"
          >
            Sort by status
          </button>
        </th>
      </tr>
    </thead>
    <tbody>
      {todos.map(todo => (
        <Todo key={todo.id} todo={todo} />
      ))}
    </tbody>
  </table>
);
