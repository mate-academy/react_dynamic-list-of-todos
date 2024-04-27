import { Filters } from '../../types/Filters';

interface Props {
  filterBy: (filter: Filters) => void;
  sortBy: (query: string) => void;
  onReset: () => void;
  query: string;
}

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  sortBy,
  onReset,
  query,
}) => {
  return (
    <form id="filters" name="filterBy" className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            name="sortFilter"
            data-cy="statusSelect"
            onChange={event => {
              filterBy(event.currentTarget.value as Filters);
            }}
          >
            <option value={Filters.All}>All</option>
            <option value={Filters.Active}>Active</option>
            <option value={Filters.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          name="queryFilter"
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={event => sortBy(event.target.value.trim().toLowerCase())}
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
              onClick={onReset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
