interface TodoFilterProps {
  query: string;
  filterType: string;
  setQuery: (value: string) => void;
  setFilterType: (value: string) => void;
}

export const TodoFilter:React.FC<TodoFilterProps> = ({
  query,
  filterType,
  setQuery,
  setFilterType,
} : TodoFilterProps) => {
  const clearQuery = () => setQuery('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={(event => setFilterType(event.target.value))}
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

        {query
            && (
              <span className="icon is-right" style={{ pointerEvents: 'all' }}>
                {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
                <button
                  data-cy="clearSearchButton"
                  type="button"
                  className="delete"
                  onClick={clearQuery}
                />
              </span>
            )}
      </p>
    </form>
  );
};
