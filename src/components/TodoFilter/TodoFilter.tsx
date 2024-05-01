import React, { useState } from 'react';

type Props = {
  onSelectedFilter: (filter: SortType) => void;
  onQuery: (query: string) => void;
};

export enum SortType {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export const TodoFilter: React.FC<Props> = ({
  onSelectedFilter = () => {},
  onQuery = () => {},
}) => {
  const [query, setQuery] = useState('');
  const handleFilterSelected = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const selectedFilter = event.target.value as SortType;

    onSelectedFilter(selectedFilter);
  };

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;

    setQuery(value);
    onQuery(value.toLowerCase());
  };

  const resetInput = () => {
    setQuery('');
    onQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleFilterSelected}>
            <option value={SortType.All}>All</option>
            <option value={SortType.Active}>Active</option>
            <option value={SortType.Completed}>Completed</option>
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
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.trim() && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
