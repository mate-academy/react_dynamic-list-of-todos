import { useState } from 'react';

type Props = {
  selectFilter: (filter: string) => void
  selectSearch: (searchText: string) => void
};

export const TodoFilter: React.FC<Props> = ({ selectFilter, selectSearch }) => {
  const [query, setQuery] = useState('');

  const reset = () => {
    setQuery('');
    selectSearch('');
  };

  const handleQuery = (e: string) => {
    setQuery(e);
    selectSearch(e);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={(event) => selectFilter(event.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="filterByTitle"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={(event) => handleQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete has-text"
              onClick={reset}
            />
          </span>
        )}

      </p>
    </form>
  );
};
