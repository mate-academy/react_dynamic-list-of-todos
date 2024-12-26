interface TodoFilterProps {
  filterStatus: 'all' | 'active' | 'completed';
  onFilterChange: (status: 'all' | 'active' | 'completed') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onClearSearch: () => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filterStatus,
  onFilterChange,
  searchQuery,
  onSearchChange,
  onClearSearch,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={filterStatus}
          onChange={e =>
            onFilterChange(e.target.value as 'all' | 'active' | 'completed')
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
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        value={searchQuery}
        onChange={e => onSearchChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>
      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {searchQuery && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={onClearSearch}
          />
        )}
      </span>
    </p>
  </form>
);
