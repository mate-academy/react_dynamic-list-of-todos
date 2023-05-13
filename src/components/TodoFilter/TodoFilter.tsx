import { FilterBy } from '../../types/Filter';

interface Props {
  query: string,
  filterBy: FilterBy,
  onFilterChange: (filterBy: FilterBy) => void,
  onQueryChange: (query: string) => void,
}

export const TodoFilter: React.FC<Props> = ({
  query,
  filterBy,
  onFilterChange,
  onQueryChange,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterBy}
          onChange={({ target }) => onFilterChange(target.value as FilterBy)}
        >
          <option value={FilterBy.ALL}>{FilterBy.ALL}</option>
          <option value={FilterBy.ACTIVE}>{FilterBy.ACTIVE}</option>
          <option value={FilterBy.COMPLETED}>{FilterBy.COMPLETED}</option>
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
        onChange={(event) => onQueryChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {query.length > 0 && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => {
              onQueryChange('');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
