import { Filter, filterLabels } from '../../App';

interface Props {
  setFilterValue: React.Dispatch<React.SetStateAction<Filter>>;
  searchTerm: string;
  handleSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClearSearch: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  setFilterValue,
  searchTerm,
  handleSearchChange,
  handleClearSearch,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => setFilterValue(event.target.value as Filter)}
          >
            {Object.values(Filter).map(filter => (
              <option key={filter} value={filter}>
                {filterLabels[filter]}
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
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchTerm && (
            <button
              aria-label="Clear search input"
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
