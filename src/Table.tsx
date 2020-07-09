/* eslint-disable no-console */
import React from 'react';
import { uuid } from 'uuidv4';
import { preparedType, preparedListType } from './interfaces';

export const Table: React.FC<preparedListType> = ({ preparedList, sortTodos }) => {
  const sortBy = (event: { preventDefault: () => void }, value: keyof preparedType) => {
    event.preventDefault();
    const sorted: preparedType[] = [...preparedList].sort((a, b) => {
      const aValue = a[value];
      const bValue = b[value];

      if (aValue !== undefined && bValue !== undefined && typeof aValue === typeof bValue) {
        return (aValue > bValue) ? 1 : -1;
      }

      return 1;
    });

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
