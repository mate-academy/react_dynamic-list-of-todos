import React from 'react';

interface Props {
  query: string,
  setQuery: (string) => void,
  setTaskStatusFilter: (string) => void,
}

export const TodoFilter: React.FC<Props> = ({
    query,
    setQuery,
    setTaskStatusFilter
  }) => (
  <form className="field has-addons" onSubmit={(event) => event.preventDefault()}>
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" onChange={(event) => setTaskStatusFilter(event.target.value)}>
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
        onChange={(event) => setQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>

        {query && (
        <button
          data-cy="clearSearchButton"
          type="button"
          className="delete"
          onClick={() => setQuery('')}
        />)}
      </span>
    </p>
  </form>
);
