import React, { useEffect, useState } from 'react';
import { TodoStatus } from '../../types/TodoStatus';

type FilterProps = {
  query: string;
  setQuery: (query: string) => void;
  status: TodoStatus;
  setStatus: (status: TodoStatus) => void;
};

export const TodoFilter: React.FC<FilterProps> = ({
  query,
  setQuery,
  status,
  setStatus,
}) => {
  const [inputValue, setInputValue] = useState(query);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQuery(inputValue);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [inputValue, setQuery]);

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
          value={inputValue}
          onChange={event => setInputValue(event.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
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
