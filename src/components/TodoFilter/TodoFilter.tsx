import React from 'react';

type Props = {
  query: string
  onApplyQuery: (...args: string[]) => void
  onSetQuery: React.Dispatch<React.SetStateAction<string>>
  filter: string
  onFilter: (filter: string) => void
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onApplyQuery,
  onSetQuery,
  filter,
  onFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={(event) => onFilter(event.target.value)}
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
          onSetQuery(event.target.value);
          onApplyQuery(event.target.value);
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
            value={query}
            onClick={() => onApplyQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
