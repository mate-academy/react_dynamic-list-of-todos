type Props = {
  filter: string;
  onFilterChange: (value: 'all' | 'active' | 'completed') => void;
  query: string;
  onQueryChange: (value: string) => void;
  onClearQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  onFilterChange,
  query,
  onQueryChange,
  onClearQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={filter}
          onChange={event => onFilterChange(event.target.value)}
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
        value={query}
        onChange={event => onQueryChange(event.target.value)}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            onClick={onClearQuery}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
          </span>
      )}
    </p>
  </form>
);
