import { FilteredBy } from '../../types/FilteredBy';

type Props = {
  query: string,
  setQuery: (query: string) => void,
  filter: FilteredBy,
  setFilter: (query: FilteredBy) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  filter,
  setFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={(event) => setFilter(
            event.target.value as FilteredBy,
          )}
        >
          <option value={FilteredBy.ALL}>All</option>
          <option value={FilteredBy.ACTIVE}>Active</option>
          <option value={FilteredBy.COMPLETED}>Completed</option>
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
        onChange={(event) => setQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
