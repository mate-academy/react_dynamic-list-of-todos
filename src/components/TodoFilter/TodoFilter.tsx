import { FilterType } from '../../types/FilterType';

type Props = {
  selectedFilter: FilterType;
  query: string;
  handleClearSearch: () => void;
  handleFilterChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const TodoFilter: React.FC<Props> = ({
  selectedFilter,
  handleFilterChange,
  query,
  handleClearSearch,
  handleInput,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option value={FilterType.ALL}>All</option>
            <option value={FilterType.ACTIVE}>Active</option>
            <option value={FilterType.COMPLETED}>Completed</option>
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
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          )}

        </span>
      </p>
    </form>
  );
};
