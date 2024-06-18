import React from 'react';

type Props = {
  clearSearchInput: () => void;
  filter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  search: string;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  handleSearch,
  search,
  clearSearchInput,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={filter}>
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
        value={search}
        onChange={handleSearch}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {search && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => clearSearchInput()}
          />
        </span>
      )}
    </p>
  </form>
);
