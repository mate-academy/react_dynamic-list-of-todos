import { FilterType } from '../../types/FilterType';

type Props = {
  value: string,
  onReset: () => void,
  onChange: (query: string) => void
  filterType: FilterType,
  onChangeFilterType: (filterType: FilterType) => void
};

export const TodoFilter: React.FC<Props> = (
  {
    value,
    onReset,
    onChange: setQuery,
    filterType,
    onChangeFilterType: setFilterType,
  },
) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const filter = event.target.value as FilterType;

    setFilterType(filter);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
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
          type="text"
          className="input"
          placeholder="Search..."
          value={value}
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {value && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
