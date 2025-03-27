import React, { useEffect, useState } from 'react';

const filter = ['All', 'Active', 'Completed'];

interface Props {
  onFilter: (filter: string) => void;
  onQuery: (query: string) => void;
}

export const TodoFilter: React.FC<Props> = React.memo(
  ({ onFilter, onQuery }) => {
    const [search, setSearch] = useState('');

    useEffect(() => {
      onQuery(search.trim());
    }, [search, onQuery]);

    return (
      <form className="field has-addons" onReset={() => setSearch('')}>
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              onChange={e => onFilter(e.target.value)}
            >
              {filter.map(status => (
                <option key={status} value={status.toLowerCase()}>
                  {status}
                </option>
              ))}
            </select>
          </span>
        </p>

        <p className="control is-expanded has-icons-left has-icons-right">
          <input
            data-cy="searchInput"
            type="text"
            className="input"
            placeholder="Search..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {search && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="reset"
                className="delete"
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);

TodoFilter.displayName = 'TodoFilter';
