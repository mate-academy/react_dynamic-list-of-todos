import React from 'react';

enum CurrentFilter {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

type Props = {
  setFilterValue: (value: CurrentFilter) => void;
  query: string;
  changeQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setFilterValue,
  query,
  changeQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
            setFilterValue(event.target.value as CurrentFilter);
          }}
        >
          <option value={CurrentFilter.all}>All</option>
          <option value={CurrentFilter.active}>Active</option>
          <option value={CurrentFilter.completed}>Completed</option>
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
        onChange={event => changeQuery(event.target.value)}
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
            onClick={() => changeQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
