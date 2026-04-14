import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';

type FilterType = 'all' | 'active' | 'completed';
interface TodoFilterProps {
  query: string;
  setQuery: (q: string) => void;
  filter: FilterType;
  setFilter: (f: FilterType) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  query,
  setQuery,
  filter,
  setFilter,
}) => (
  <form className="field has-addons" onSubmit={event => event.preventDefault()}>
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={event => setFilter(event.target.value as FilterType)}
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
        onChange={event => setQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>
      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query ? (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setQuery('')}
          />
        ) : (
          <span style={{ width: '1.25rem', display: 'inline-block' }} />
        )}
      </span>
    </p>
  </form>
);
