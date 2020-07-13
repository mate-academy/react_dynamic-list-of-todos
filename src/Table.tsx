/* eslint-disable no-console */
import React, { useState } from 'react';
import { uuid } from 'uuidv4';
import { TodoWithUserInterface } from './interfaces';

interface Props {
  preparedList: TodoWithUserInterface[];
  sortTodos: (list: TodoWithUserInterface[]) => void;
}

export const Table: React.FC<Props> = ({ preparedList, sortTodos }) => {
  const [direction, setDirection] = useState(false);
  const sortBy = (event: { preventDefault: () => void }, value: keyof TodoWithUserInterface) => {
    event.preventDefault();
    const sorted: TodoWithUserInterface[] = [...preparedList].sort((a, b) => {
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
            <a href="/" onClick={(event) => sortBy(event, 'completed')}>
              Completed
            </a>
          </th>
          <th scope="col">
            <a href="/" onClick={(event) => sortBy(event, 'title')}>
              Title
            </a>
          </th>
          <th scope="col">
            <a href="/" onClick={(event) => sortBy(event, 'user')}>
              User
            </a>
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
