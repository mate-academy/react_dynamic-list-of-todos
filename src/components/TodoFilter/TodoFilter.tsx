import { useCallback } from 'react';

interface Props {
  query: string,
  setQuery: (newQuery: string) => void,
  setFilter: (selectedFilter: string) => void,
  filter: string
}

export const TodoFilter: React.FC<Props> = (props) => {
  const {
    query,
    setQuery,
    setFilter,
    filter,
  } = props;
  const reset = useCallback(() => setQuery(''), []);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
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
          value={query}
          placeholder="Search..."
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query
            && (
              <span className="icon is-right" style={{ pointerEvents: 'all' }}>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  data-cy="clearSearchButton"
                  type="button"
                  className="delete"
                  onClick={reset}
                />
              </span>
            )}

      </p>
    </form>
  );
};
