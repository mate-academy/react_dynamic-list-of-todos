import { FilterOptions } from '../../types/FilterOptions';

interface Props {
  selectedFilter: FilterOptions;
  setSelectedFilter: React.Dispatch<React.SetStateAction<FilterOptions>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const TodoFilter: React.FC<Props> = ({
  selectedFilter,
  setSelectedFilter,
  query,
  setQuery,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value as FilterOptions);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  const clearQuery = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
            value={selectedFilter}
          >
            <option value={FilterOptions.All}>All</option>
            <option value={FilterOptions.Active}>Active</option>
            <option value={FilterOptions.Completed}>Completed</option>
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
          onChange={handleInputChange}
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
              onClick={clearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
