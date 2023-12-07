interface TodoFilterProps {
  query: string,
  setQuery: (value: string) => void
  setTodosCategory: (value: string) => void
}

export const TodoFilter = ({
  query,
  setQuery,
  setTodosCategory,
}: TodoFilterProps) => {
  return (
    <form className="field has-addons">
      <div className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => setTodosCategory(event.target.value)}
            defaultValue="all"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </div>

      <div className="control is-expanded has-icons-left has-icons-right">
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

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </div>
    </form>
  );
};
