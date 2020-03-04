import React, { FC } from 'react';
import { Todo } from '../Todo/Todo';
import './TodoList.css';

interface Props {
  todos: TodoWithUser[];
  onSortId: () => void;
  onSortTask: () => void;
  onSortName: () => void;
  onSortStatus: () => void;
}

export const TodoList: FC<Props> = ({
  todos,
  onSortId,
  onSortTask,
  onSortName,
  onSortStatus,
}) => (
  <table className="todo-list">
    <thead>
      <tr className="todo-list__header">
        <th>
          <button
            type="button"
            onClick={onSortId}
            className="todo-list__sort-btn"
          >
            Sort by Id
          </button>
        </th>
        <th>
          <button
            type="button"
            onClick={onSortName}
            className="todo-list__sort-btn"
          >
            Sort by User name
          </button>
        </th>
        <th>
          <button
            type="button"
            onClick={onSortTask}
            className="todo-list__sort-btn"
          >
            Sort by task name
          </button>
        </th>
        <th>
          <button
            type="button"
            onClick={onSortStatus}
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
