import React, { useState } from 'react';

type Props = {
  getSelect: React.Dispatch<React.SetStateAction<string>>;
  getQuery: React.Dispatch<React.SetStateAction<string>>;
  select: string;
};

export const TodoFilter: React.FC<Props> = ({
  getSelect,
  getQuery,
  select,
}) => {
  const [query, setQuery] = useState('');

  const reset = () => {
    getQuery('');
    setQuery('');
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    getSelect(event.target.value);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    getQuery(event.target.value.toLowerCase());
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={select}
            title="Filter by status"
            onChange={handleSelectChange}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              title="Clear search"
              type="button"
              className="delete"
              onClick={reset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
