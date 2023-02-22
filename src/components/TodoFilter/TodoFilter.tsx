import React, { useCallback } from 'react';
import { FilterType } from '../../types/Filter';

type Props = {
  query: string,
  setQuery: (event: string) => void,
  status: string,
  setStatus: (stats: FilterType) => void;
  debounceQuery: (event: string) => void;
};

export const TodoFilter:React.FC<Props> = ({
  query,
  setQuery,
  status,
  setStatus,
  debounceQuery,
}) => {
  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
    debounceQuery(event.target.value);
  };

  const resetQuery = () => {
    setQuery('');
    debounceQuery('');
  };

  const handleSelectFilterType = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      setStatus(event.target.value as FilterType);
    },
    [],
  );

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(event) => {
              handleSelectFilterType(event);
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
          value={query}
          onChange={(event) => {
            handleQuery(event);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>

            <button
              aria-label="button"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                resetQuery();
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
