import { FC } from 'react';

interface Props {
  query: string,
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleClear: () => void;
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  selectedFilter:string;
}

export const TodoFilter:FC <Props> = ({
  query,
  handleSearch,
  handleClear,
  selectedFilter,
  handleSelect,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectedFilter}
          onChange={handleSelect}
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
            onClick={handleClear}
          />
        </span>
      )}

    </p>
  </form>
);
