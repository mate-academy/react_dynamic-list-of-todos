/* eslint-disable jsx-a11y/control-has-associated-label */
interface TodoFilterProps {
  onQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  onDelete: () => void
  query: string
  filter: string
}
export const TodoFilter: React.FC<TodoFilterProps> = ({
  onQueryChange,
  onFilterChange,
  onDelete,
  query,
  filter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={onFilterChange}
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
        onChange={onQueryChange}
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
            onClick={onDelete}
          />
        )}
      </span>
    </p>
  </form>
);
