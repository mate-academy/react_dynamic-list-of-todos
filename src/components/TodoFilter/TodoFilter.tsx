import { ChangeEvent } from 'react';

type Props = {
  filterBy: string,
  setFilterBy: (event: string) => void,
  query: string,
  setQuery: (event: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  query,
  setQuery,
}) => {
  const handleFilterBy = (event: ChangeEvent<HTMLSelectElement>) => {
    setFilterBy(event.target.value);
  };

  const handleQuery = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={handleFilterBy}
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
          onChange={handleQuery}
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
              value={query}
              aria-label="clear search button"
              onClick={() => {
                setQuery('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
