type TodoFilterProps = {
  query: string;
  setQuery: (query: string) => void;
  statusFilter: 'all' | 'active' | 'completed';
  setStatusFilter: (status: 'all' | 'active' | 'completed') => void;
};

export const TodoFilter: React.FC<TodoFilterProps> = ({
  query,
  setQuery,
  statusFilter,
  setStatusFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={statusFilter}
          onChange={event =>
            setStatusFilter(
              event.target.value as 'all' | 'active' | 'completed',
            )
          }
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
        value={query}
        className="input"
        placeholder="Search..."
        onChange={event => setQuery(event.target.value)}
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
            onClick={() => setQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
