import React from 'react';

type Props = {
  query: string;
  setQuery: (val: string) => void;
  filterStatus: string;
  setFilterStatus: (val: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  filterStatus,
  setFilterStatus,
}) => (
  <form
    className="field has-addons"
    onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
    }}
  >
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterStatus}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
            setFilterStatus(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        type="text"
        className="input"
        placeholder="Search..."
        data-cy="searchInput"
        value={query}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setQuery(e.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            type="button"
            className="delete"
            data-cy="clearSearchButton"
            onClick={() => setQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
