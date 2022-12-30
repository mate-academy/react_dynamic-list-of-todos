type Props = {
  query: string;
  filterType: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  setFilterType: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoFilter = ({
  query,
  filterType,
  setQuery,
  setFilterType,
}: Props) => {
  const clearQuery = () => setQuery('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={(e => setFilterType(e.target.value))}
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
          onChange={e => setQuery(e.target.value)}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span
          className="icon is-right"
          style={{ pointerEvents: 'all' }}
        >
          {query
            && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={clearQuery}
                aria-label="Clear"
              />
            )}
        </span>
      </p>
    </form>
  );
};
