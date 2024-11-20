import { Filter } from '../../types/Filter';

type Props = {
  selectedFilter: Filter;
  onFilterChange: (filter: Filter) => void;
  searchValue: string;
  onSearchChange: (phrase: string) => void;
};

export const TodoFilter = ({
  selectedFilter,
  onFilterChange,
  searchValue,
  onSearchChange,
}: Props) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilter = event.target.value as Filter;

    onFilterChange(newFilter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={handleFilterChange}
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
          value={searchValue}
          type="text"
          className="input"
          placeholder="Search..."
          onChange={e => onSearchChange(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchValue && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onSearchChange('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
