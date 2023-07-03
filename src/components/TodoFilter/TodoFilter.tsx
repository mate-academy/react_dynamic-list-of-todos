import { FilterStatus } from '../../helper';

interface Props {
  onFilterChange: (arg: FilterStatus) => void,
  currentFilter: FilterStatus,
  onQueryChange: (arg: string) => void,
  currentQuery: string,
}

export const TodoFilter:React.FC<Props> = ({
  onFilterChange,
  currentFilter,
  onQueryChange,
  currentQuery,
}) => {
  const hanldeFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(event.target.value as FilterStatus);
  };

  const hanldeQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={currentFilter}
            onChange={hanldeFilterChange}
          >
            <option value={FilterStatus.ALL}>All</option>
            <option value={FilterStatus.ACTIVE}>Active</option>
            <option value={FilterStatus.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={currentQuery}
          onChange={hanldeQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {currentQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                onQueryChange('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
