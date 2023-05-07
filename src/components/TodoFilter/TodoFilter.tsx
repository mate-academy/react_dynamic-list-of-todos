import React from 'react';

type Props = {
  query: string;
  selectFilterType: (filter: React.ChangeEvent<HTMLSelectElement>) => void;
  setVisibleAndAppliedQuery: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => void;
  resetQuery: () => void;
};

export const TodoFilter: React.FC<Props> = React.memo(({
  query,
  selectFilterType,
  setVisibleAndAppliedQuery,
  resetQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={selectFilterType}
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
        onChange={setVisibleAndAppliedQuery}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            aria-label="clear input"
            className="delete"
            onClick={resetQuery}
          />
        </span>
      )}
    </p>
  </form>
));
