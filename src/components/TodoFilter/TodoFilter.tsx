import { useCallback, useRef } from 'react';

type Props = {
  query: string;
  onQueryChange: (v: string) => void;
  filter: string;
  onFilterChange: (f: string) => void;
  onAppliedQuerry: (q: string) => void;
};

export const TodoFilter = ({
  query,
  onQueryChange,
  filter,
  onFilterChange,
  onAppliedQuerry,
}: Props) => {
  const reset = useCallback(() => {
    onQueryChange('');
    onAppliedQuerry('');
  }, []);

  const timerId = useRef(0);

  const applyQuerry = useCallback((finallyQuery: string) => {
    window.clearTimeout(timerId.current);

    timerId.current = window.setTimeout(() => {
      onAppliedQuerry(finallyQuery);
    }, 300);
  }, []);

  const querryChangeHelper = (event: React.ChangeEvent<HTMLInputElement>) => {
    const finnalyQuery = event.target.value;

    onQueryChange(finnalyQuery);
    applyQuerry(finnalyQuery.toLowerCase());
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filter}
            data-cy="statusSelect"
            onChange={e => onFilterChange(e.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={event => querryChangeHelper(event)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              onClick={reset}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
