import { useCallback, useState } from 'react';

type Props = {
  filterType: string,
  setFilterType(filterType: string): void,
  appliedQuery: string,
  setAppliedQuery(query: string): void,
};

const debounce = (f: (value: string) => void, delay: number) => {
  let id: number | undefined;

  return function wrapper <T>(...args: T[]) {
    clearTimeout(id);
    id = +setTimeout(f, delay, ...args);
  };
};

export const TodoFilter: React.FC<Props> = ({
  filterType,
  setFilterType,
  setAppliedQuery,
}) => {
  const [query, setQuery] = useState('');

  const applyQuery = useCallback(debounce(setAppliedQuery, 1000), []);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={event => setFilterType(event.target.value)}
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
          onChange={event => {
            setQuery(event.target.value);
            applyQuery(event.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setQuery('');
                setAppliedQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
