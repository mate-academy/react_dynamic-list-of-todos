import React from 'react';

type Props = {
  query: string;
  queryHandler: (str: string) => void;
  filterHandler: (str: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  queryHandler,
  filterHandler,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => filterHandler(event.target.value)}
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
        onChange={event => queryHandler(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query !== '' && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => queryHandler('')}
          />
        )}
      </span>
    </p>
  </form>
);
