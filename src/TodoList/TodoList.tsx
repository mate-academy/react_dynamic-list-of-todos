import React, { FC } from 'react';
import { TodoWithUser } from '../types';
import { Todo } from '../Todo';
import './TodoList.css';

interface Props {
  todos: TodoWithUser[];
  handleSortByName(): void;
  handleSortByTitle(): void;
  handleSortByCompleted(): void;
}

export const TodoList: FC<Props> = (props) => {
  const {
    todos,
    handleSortByName,
    handleSortByTitle,
    handleSortByCompleted,
  } = props;

  return (
    <table className="table">
      <thead className="table__header">
        <tr>
          <th>
            <button
              type="button"
              className="table__button"
              onClick={handleSortByName}
            >
              Name
            </button>
          </th>
          <th>
            <button
              type="button"
              className="table__button"
              onClick={handleSortByTitle}
            >
              Todo
            </button>
          </th>
          <th>
            <button
              type="button"
              className="table__button"
              onClick={handleSortByCompleted}
            >
              Status
            </button>
          </th>
        </tr>
      </thead>
      <tbody className="table__body">
        {todos.map(todo => (
          <Todo
            todo={todo}
            key={todo.id}
          />
        ))}
      </tbody>
    </table>
  );
};
