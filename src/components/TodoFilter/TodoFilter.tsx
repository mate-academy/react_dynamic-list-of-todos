export enum TodoComplitedFilter {
  All,
  Completed,
  Active,
}

interface Props {
  query: string;
  changeQuery: (newQuery: string) => void;
  complitedFilter: TodoComplitedFilter;
  setComplitedFilter: (v: TodoComplitedFilter) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  changeQuery,
  complitedFilter,
  setComplitedFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(e) => {
            setComplitedFilter(+e.target.value);
          }}
          value={complitedFilter}
        >
          <option value={TodoComplitedFilter.All}>All</option>
          <option value={TodoComplitedFilter.Active}>Active</option>
          <option value={TodoComplitedFilter.Completed}>Completed</option>
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
        onChange={(e) => {
          changeQuery(e.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        <button
          data-cy="clearSearchButton"
          type="button"
          className="delete"
          onClick={() => {
            changeQuery('');
          }}
        />
      </span>
    </p>
  </form>
);
