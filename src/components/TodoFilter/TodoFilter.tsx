import React from 'react';
import { TodoStatus } from '../../types/TodoStatus';
import { FILTER_OPTIONS } from '../../utils/constants';

type Props = {
  selectedFilter: TodoStatus,
  setSelectedFilter: (status: TodoStatus) => void,
  query: string,
  setQuery: (query: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  selectedFilter,
  setSelectedFilter,
  query,
  setQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={selectedFilter}
            data-cy="statusSelect"
            onChange={(event) => {
              setSelectedFilter(event.target.value as TodoStatus);
            }}
          >
            {FILTER_OPTIONS.map(option => (
              <option
                key={option.value}
                value={option.value}
              >
                {option.label}
              </option>
            ))}
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
            setQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setQuery('');
                setSelectedFilter(TodoStatus.All);
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
