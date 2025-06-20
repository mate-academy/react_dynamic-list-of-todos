import { TodoFilterProps } from '../../types/Props';

export const TodoFilter: React.FC<TodoFilterProps> = ({
  statusFilter,
  searchQuery,
  onStatusFilterChange,
  onSearchQueryChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={statusFilter}
          onChange={e =>
            onStatusFilterChange(
              e.target.value as 'all' | 'active' | 'completed',
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
        className="input"
        placeholder="Search..."
        value={searchQuery}
        onChange={e => onSearchQueryChange(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchQuery ? (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onSearchQueryChange('')}
          />
        </span>
      ) : null}
    </p>
  </form>
);
