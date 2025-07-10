type Props = {
  statusFilter: 'all' | 'completed' | 'active';
  onStatusChange: (status: 'all' | 'completed' | 'active') => void;
  query: string;
  onQueryChange: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  statusFilter,
  onStatusChange,
  query,
  onQueryChange,
}) => {
  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            value={statusFilter}
            onChange={e =>
              onStatusChange(e.target.value as 'all' | 'completed' | 'active')
            }
            data-cy="statusSelect"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          data-cy="searchInput"
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onQueryChange('')}
              aria-label="Clear search"
            />
          </span>
        )}
      </p>
    </form>
  );
};
