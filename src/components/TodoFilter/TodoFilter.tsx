import { Filters } from '../../types/Filters';

type Props = {
  onFilterChange: (newFilter: Filters) => void,
  onQueryChange: (newQuery: string) => void,
  query: string,
};

export const TodoFilter: React.FC<Props> = ({
  onFilterChange,
  onQueryChange,
  query,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (event.target.value === Filters.All
      || event.target.value === Filters.Completed
      || event.target.value === Filters.Active) {
      onFilterChange(event.target.value);
    }
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const handleQueryClear = () => {
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
          >
            {Object.entries(Filters).map(([key, value]) => (
              <option
                value={value}
                key={key}
              >
                {key}
              </option>
            ))}
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

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              aria-label="clearSearchButton"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryClear}
            />
          )}

        </span>
      </p>
    </form>
  );
};
