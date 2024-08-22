import React, { useEffect, useState, useCallback } from 'react';
import { TodoStatus } from '../../types/TodoStatus';
import debounce from 'lodash/debounce';
import './TodoFilter.css';

type Props = {
  query: string;
  setQuery: (query: string) => void;
  status: TodoStatus;
  setStatus: (status: TodoStatus) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  status,
  setStatus,
}) => {
  const [inputValue, setInputValue] = useState(query);

  const debouncedSetQuery = useCallback(
    debounce((value: string) => {
      setQuery(value);
    }, 1000),
    [],
  );

  useEffect(() => {
    debouncedSetQuery(inputValue);

    return () => {
      debouncedSetQuery.cancel();
    };
  }, [inputValue, debouncedSetQuery]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as TodoStatus);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
          >
            <option value={TodoStatus.all}>All</option>
            <option value={TodoStatus.active}>Active</option>
            <option value={TodoStatus.completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue && (
          <span className="icon is-right icon-pointer-all">
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setInputValue('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
