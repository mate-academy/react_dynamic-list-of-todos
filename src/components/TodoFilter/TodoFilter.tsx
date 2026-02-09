export enum FilterState {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

type Props = {
  filterValue: FilterState;
  onFilterChange: (newValue: FilterState) => void;

  searchQuery: string;
  onSearchChange: (newQuery: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterValue,
  onFilterChange,
  searchQuery,
  onSearchChange,
}) => {
  function handleFilterChange(newFilterValue: string) {
    onFilterChange(newFilterValue as FilterState);
  }

  function handleSearchChanged(newQuery: string) {
    onSearchChange(newQuery);
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterValue}
            onChange={event => handleFilterChange(event.target.value)}
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
          onChange={event => handleSearchChanged(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleSearchChanged('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
