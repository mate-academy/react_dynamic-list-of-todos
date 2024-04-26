import React, { ChangeEventHandler, FC } from 'react';

export type StatusFilter = 'all' | 'active' | 'completed';

type Props = {
  query: string | null;
  onSearch: (query: string) => void;
  onSelectFilter: (filter: StatusFilter) => void;
};

export const TodoFilter: FC<Props> = ({ query, onSearch, onSelectFilter }) => {
  const handleInputChange: ChangeEventHandler<HTMLInputElement> = e => {
    onSearch(e.target.value);
  };

  const handleSelectChange: ChangeEventHandler<HTMLSelectElement> = e => {
    const status = e.target.value as StatusFilter;

    onSelectFilter(status);
  };

  const handleClear = () => {
    onSearch('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelectChange}>
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
          value={query || ''}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {!!query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
