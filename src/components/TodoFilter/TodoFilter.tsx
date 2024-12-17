import { FilterByState } from '../../types/FilterByState';

type Props = {
  query: string;
  setQuery: (query: string) => void;
  setFilterBy: (filterBy: FilterByState) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setFilterBy,
  query,
  setQuery,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => setFilterBy(event.target.value as FilterByState)}
          >
            <option value={FilterByState.ALL}>All</option>
            <option value={FilterByState.ACTIVE}>Active</option>
            <option value={FilterByState.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={event => setQuery(event.target.value)}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={query}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}

          {query && (
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
};
