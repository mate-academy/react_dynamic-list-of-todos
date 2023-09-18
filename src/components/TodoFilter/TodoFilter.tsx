import { TodosFilter } from '../../types/TodoFilter';

type Props = {
  searchQuery: string;
  onQueryChange: (query: string) => void;
  selectedFilter: TodosFilter;
  onfilterChange: (filter: TodosFilter) => void;
};

export const TodoFilter: React.FC<Props> = ({
  searchQuery,
  onQueryChange,
  selectedFilter,
  onfilterChange,
}) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectFilter = event.target.value as TodosFilter;

    onfilterChange(selectFilter);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;

    onQueryChange(newQuery);
  };

  const clear = () => {
    onQueryChange('');
    onfilterChange(TodosFilter.All);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={handleSelectChange}
          >
            <option value={TodosFilter.All}>All</option>
            <option value={TodosFilter.Active}>Active</option>
            <option value={TodosFilter.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {searchQuery && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear"
              onClick={clear}
            />
          )}
        </span>
      </p>
    </form>

  );
};
