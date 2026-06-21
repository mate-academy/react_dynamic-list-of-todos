type Props = {
  query: string;
  statusFilter: string;
  setQuery: (value: string) => void;
  setStatusFilter: (event: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  statusFilter,
  setStatusFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={statusFilter}
          onChange={event => setStatusFilter(event.target.value)}
          data-cy="statusSelect"
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
        value={query}
        onChange={event => setQuery(event.target.value)}
        type="text"
        className="input"
        placeholder="Search..."
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
            onClick={() => {
              setQuery('');
              setStatusFilter('all');
            }}
          />
        </span>
      )}
    </p>
  </form>
);
