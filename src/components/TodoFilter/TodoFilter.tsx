import { Filters } from '../../types/Filters';

interface Props {
  query: string;
  onQueryChange: (newquery: string) => void;
  filter: Filters;
  onFilterChange: (Filters: Filters) => void;
}
export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  onFilterChange,
  filter,
}) => {
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value as Filters);
  };

  const handleClearFilters = (() => {
    onQueryChange('');
  });

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filter}
            onChange={handleFilterChange}
          >
            <option value={Filters.All}>All</option>
            <option value={Filters.Active}>Active</option>
            <option value={Filters.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          onChange={handleQueryChange}
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
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clearFilters"
              onClick={handleClearFilters}
            />
          </span>
        )}

      </p>
    </form>
  );
};
