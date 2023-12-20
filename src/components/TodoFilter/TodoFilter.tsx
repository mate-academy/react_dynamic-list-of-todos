import { Filters } from '../../types/Filters';

const filters: (keyof typeof Filters)[] = [
  Filters.all,
  Filters.active,
  Filters.completed,
];

type Props = {
  filterBy: keyof typeof Filters,
  onChangeFilter: (filter: keyof typeof Filters) => void,
  query: string,
  onQueryChange: (query: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  onChangeFilter,
  query,
  onQueryChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filterBy}
            data-cy="statusSelect"
            onChange={(event) => {
              onChangeFilter(event.target.value as keyof typeof Filters);
            }}
          >
            {filters.map(filter => (
              <option value={filter} key={filter}>
                {filter[0].toUpperCase() + filter.slice(1)}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={(event) => onQueryChange(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear query"
              onClick={() => onQueryChange('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
