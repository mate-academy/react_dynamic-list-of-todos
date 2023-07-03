/* eslint-disable max-len */
import { FilterType } from '../../types/Enum';

type TodoFilterProps = {
  filterType: FilterType,
  setFilterType: (filterType: FilterType) => void,
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  handleQueryDelete: () => void,
  query: string,
};

export const TodoFilter = (
  {
    filterType,
    setFilterType,
    handleInputChange,
    handleQueryDelete,
    query,
  }
  : TodoFilterProps,
) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterType}
            onChange={(event) => setFilterType(event?.target.value as FilterType)}
          >
            <option value={FilterType.All}>All</option>
            <option value={FilterType.Active}>Active</option>
            <option value={FilterType.Completed}>Completed</option>
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
              onClick={handleQueryDelete}
            />
          </span>
        )}
      </p>
    </form>
  );
};
