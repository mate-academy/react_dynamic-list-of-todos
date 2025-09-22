interface TodoFilterProps {
  status: 'all' | 'active' | 'completed';
  onStatusChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  search: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  status,
  search,
  onStatusChange,
  onClear,
  onSearchChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" value={status} onChange={onStatusChange}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        value={search}
        onChange={onSearchChange}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {search && (
        <button
          data-cy="clearSearchButton"
          type="button"
          className="delete"
          onClick={onClear}
        />
        )}
      </span>
    </p>
  </form>
);
