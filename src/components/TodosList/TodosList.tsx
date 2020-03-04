import React, { FC } from 'react';
import { Todo } from '../Todo/Todo';

interface State {
  todos: TodoWithUser[];
  onSortTask: () => void;
  onSortName: () => void;
  onSortStatus: () => void;
}

export const TodosList: FC<State> = ({
  todos,
  onSortTask,
  onSortName,
  onSortStatus,
}) => (
  <table className="table">
    <thead className="table__header">
      <tr>
        <th>ID</th>
        <th>
          User
          <button
            type="button"
            onClick={onSortName}
            className="btn"
          >
            <img
              src="https://img.icons8.com/metro/26/000000/sort.png"
              className="table__icon"
              alt="Sort icon"
            />
          </button>
        </th>
        <th>
          <button
            type="button"
            onClick={onSortTask}
            className="btn"
          >
            <img
              src="https://img.icons8.com/metro/26/000000/sort.png"
              className="table__icon"
              alt="Sort icon"
            />
          </button>
          Task
        </th>
        <th>
          Status
          <button
            type="button"
            onClick={onSortStatus}
            className="btn"
          >
            <img
              src="https://img.icons8.com/metro/26/000000/sort.png"
              className="table__icon"
              alt="Sort icon"
            />
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
