import { FilterType } from '../../types/FilterType';

type Props = {
  query: string,
  filterType: FilterType,
  onQueryChange: (query:string) => void,
  onFilterTypeChange: (filterType: FilterType) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  filterType,
  onQueryChange,
  onFilterTypeChange,
}) => {
  const handleFilterTypeChange
  = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterTypeChange(event.target.value as FilterType);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const handleClearSearch = () => {
    onQueryChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={handleFilterTypeChange}
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
          value={query}
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
              aria-label="Clear Search"
            />
          </span>
        )}
      </p>
    </form>
  );
};
