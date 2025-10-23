export enum StatusState {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

export type Filters = {
  status: StatusState;
  query: string;
};

type TodoFilterProps = {
  filters: Filters;
  onStatusChange: (newType: StatusState) => void;
  onQueryChange: (newQuery: string) => void;
};

export const TodoFilter = ({
  filters,
  onStatusChange,
  onQueryChange,
}: TodoFilterProps) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as StatusState;

    onStatusChange(newStatus);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const handleClearQuery = () => {
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filters.status}
            onChange={handleStatusChange}
          >
            <option value={StatusState.All}>All</option>
            <option value={StatusState.Active}>Active</option>
            <option value={StatusState.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={filters.query}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filters.query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
