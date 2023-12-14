import React, { useState } from 'react';

type Props = {
  getQuery: (arg: string) => void;
  getSortBy: (arg: any) => void;
};

export const TodoFilter: React.FC<Props> = ({ getQuery, getSortBy }) => {
  const [query, setQuery] = useState('');

  const handleSortBy = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value[0].toUpperCase() + e.target.value.slice(1);

    getSortBy(value);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setQuery(value);
    getQuery(value);
  };

  const handleOndelete = () => {
    setQuery('');
    getQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={handleSortBy}
            data-cy="statusSelect"
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
          onChange={handleSearch}
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
              onClick={handleOndelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
