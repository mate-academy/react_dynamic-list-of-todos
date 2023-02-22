import React from 'react';

type Props = {
  query: string,
  onChangedQuery: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetQuery: () => void;
  selectFilter: string;
  setSelectFilter: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangedQuery,
  resetQuery,
  selectFilter,
  setSelectFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={selectFilter}
          onChange={(event) => setSelectFilter(event.target.value)}
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
        onChange={onChangedQuery}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={resetQuery}
            aria-label="Clear"
          />
        </span>
      )}
    </p>
  </form>
);
