/* eslint-disable no-console */
import React from 'react';
import { uuid } from 'uuidv4';
import { PreparedProps, SortValue, PreparedListProps } from './interfaces';

export const Table: React.FC<PreparedListProps> = ({ preparedList, sortTodos }) => {
  const getKeyValue = <T extends {}, U extends keyof T>(key: U, obj: T) => obj[key];

  const sortBy = (event: { preventDefault: () => void }, value: SortValue) => {
    event.preventDefault();
    const sorted: PreparedProps[] = preparedList.sort((a: PreparedProps, b: PreparedProps) => {
      const aValue = getKeyValue<PreparedProps, SortValue>(value, a) || {};
      const bValue = getKeyValue<PreparedProps, SortValue>(value, b) || {};

      return (aValue >= bValue) ? 1 : -1;
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
