import React from 'react';

type Props = {
  onFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  filter: string;
  query: string;
  onInputQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  onFilter,
  filter,
  query,
  onInputQuery,
  onClear,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={onFilter} value={filter}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="active">Active</option>
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
        onChange={onInputQuery}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onClear}
          />
        )}
      </span>
    </p>
  </form>
);
