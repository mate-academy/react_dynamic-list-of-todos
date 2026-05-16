import { FilterOption } from '../../types/FilterOption';

interface Props {
  query: string;
  onQueryChange: (value: string) => void;
  statusFilter: FilterOption;
  onStatusFilterChange: (value: FilterOption) => void;
}

export const TodoFilter = ({
  query,
  onQueryChange,
  statusFilter,
  onStatusFilterChange,
}: Props) => {
  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const preparedValue = event.target.value.trimStart().replace(/\s+/g, ' ');

    onQueryChange(preparedValue);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={statusFilter}
            onChange={event =>
              onStatusFilterChange(event.target.value as FilterOption)
            }
          >
            <option value={FilterOption.ALL}>All</option>
            <option value={FilterOption.ACTIVE}>Active</option>
            <option value={FilterOption.COMPLETED}>Completed</option>
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
          onChange={handleQueryChange}
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
              onClick={() => onQueryChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
