import { CompletedFilter } from '../../types/CompletedFilter';

interface P {
  handleCompletedFilter: (complete: CompletedFilter)=> void;
  handleSearchQuery: (newQuery: string)=> void;
  query: string;
}

export const TodoFilter: React.FC<P> = ({
  handleCompletedFilter,
  handleSearchQuery,
  query,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => (
            handleCompletedFilter(event.target.value as CompletedFilter))}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
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
        onChange={(event) => handleSearchQuery(event.target.value)}
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
            onClick={() => handleSearchQuery('')}
          />
        </span>
      )}

    </p>
  </form>
);
