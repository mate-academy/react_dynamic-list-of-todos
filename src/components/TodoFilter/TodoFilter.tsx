/* eslint-disable jsx-a11y/control-has-associated-label */
import { useState, useEffect } from 'react';
import { Status } from '../../types/Status';

interface TodoFilterProps {
  searchForTodos: (query: string, status: Status) => void,
}

export const TodoFilter
= ({ searchForTodos }: TodoFilterProps) => {
  const [inputQuery, setInputQuery] = useState<string>('');
  const [todoStatus, setTodoStatus] = useState<Status>('all');

  useEffect(() => {
    searchForTodos(inputQuery, todoStatus);
  }, [todoStatus, inputQuery]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={todoStatus}
            onChange={(event) => {
              setTodoStatus(event.target.value as Status);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputQuery}
          onChange={(event) => {
            setInputQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {inputQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setInputQuery('')}
            />
          </span>
        )}

      </p>
    </form>
  );
};
