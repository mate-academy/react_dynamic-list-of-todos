/* eslint-disable no-console */
import React, { useState, MouseEvent } from 'react';
import { uuid } from 'uuidv4';
import { TodoWithUser } from './interfaces';

interface Props {
  preparedList: TodoWithUser[];
  sortTodos: (list: TodoWithUser[]) => void;
}

export const Table: React.FC<Props> = ({ preparedList, sortTodos }) => {
  const [direction, setDirection] = useState(false);
  const sortBy = (event: MouseEvent<HTMLButtonElement>, value: keyof TodoWithUser) => {
    event.preventDefault();
    const sorted: TodoWithUser[] = [...preparedList].sort((a, b) => {
      const aValue = a[value];
      const bValue = b[value];

      if (aValue !== undefined && bValue !== undefined && typeof aValue === typeof bValue) {
        if (direction) {
          return (aValue <= bValue) ? 1 : -1;
        }

        return (aValue >= bValue) ? 1 : -1;
      }

      return 1;
    });

    setDirection(!direction);
    sortTodos(sorted);
  };

  return (
    <table className="table table-striped table-bordered">
      <thead className="thead-dark">
        <tr>
          <th scope="col">
            <button
              className="sort_btn"
              type="button"
              onClick={(event) => sortBy(event, 'completed')}
            >
              Completed
            </button>
          </th>
          <th scope="col">
            <button
              type="button"
              className="sort_btn"
              onClick={(event) => sortBy(event, 'title')}
            >
              Title
            </button>
          </th>
          <th scope="col">
            <button
              type="button"
              className="sort_btn"
              onClick={(event) => sortBy(event, 'user')}
            >
              User
            </button>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          preparedList.map(todo => (
            <tr key={uuid()}>
              <td><input type="checkbox" readOnly checked={todo.completed} /></td>
              <td>{todo.title}</td>
              <td>{todo.user}</td>
            </tr>
          ))
        }
      </tbody>
    </table>
  );
};
