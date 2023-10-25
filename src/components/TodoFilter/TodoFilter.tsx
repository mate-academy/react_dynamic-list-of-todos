import React from 'react';

type Props = {
  query: string,
  onChangeQuery: (event: React.ChangeEvent<HTMLInputElement>) => void,
  filterOption: string,
  setFilterOption: (option: string) => void,
  resetQuery: () => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeQuery,
  filterOption,
  setFilterOption,
  resetQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          defaultValue={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
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
        onChange={onChangeQuery}
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
            onClick={resetQuery}
          />
        </span>
      )}
    </p>
  </form>
);
