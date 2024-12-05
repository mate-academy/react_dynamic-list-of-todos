import { TodoStatusFilter } from '../../types/TodoStatusFilter';

interface TodoFilterProps {
  selectedFilter: TodoStatusFilter;
  setSelectedFilter: React.Dispatch<React.SetStateAction<TodoStatusFilter>>;
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  selectedFilter,
  setSelectedFilter,
  query,
  setQuery,
}) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setQuery(event.target.value);

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFilter(event.target.value as TodoStatusFilter);
  };

  const clearInput = () => {
    setQuery('');
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
            <option value={TodoStatusFilter.All}>All</option>
            <option value={TodoStatusFilter.Active}>Active</option>
            <option value={TodoStatusFilter.Completed}>Completed</option>
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
              onClick={clearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
};
