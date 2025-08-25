import { FilterOptions } from '../../types/FilterOptions';

type Props = {
  filterOption: FilterOptions;
  searchQuery: string;
  onSelectChange: (option: FilterOptions) => void;
  handleSearchQuery: (string: string) => void;
  handleClearSearchQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterOption,
  searchQuery,
  onSelectChange,
  handleSearchQuery,
  handleClearSearchQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={e => onSelectChange(e.target.value as FilterOptions)}
          value={filterOption}
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
        value={searchQuery}
        onChange={e => handleSearchQuery(e.target.value)}
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
            onClick={handleClearSearchQuery}
          />
        )}
      </span>
    </p>
  </form>
);
