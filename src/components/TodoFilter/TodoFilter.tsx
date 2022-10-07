/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { ChangeEvent } from 'react';

type Props = {
  filterBy: string
  setFilterBy: (str: string) => void,
  query: string
  setQuery: (str: string) => void,
  setResponseFilter: (value: string) => void
  responseFilter: string;
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  query,
  setQuery,
  setResponseFilter,
  responseFilter,
}) => {
  const handleResponsefilterParams = (event: ChangeEvent<HTMLInputElement>) => {
    setResponseFilter(event.target.value);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={event => (
              setFilterBy(event.target.value)
            )}
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
          value={responseFilter}
          onChange={handleResponsefilterParams}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}

        </span>
      </p>
    </form>
  );
};
