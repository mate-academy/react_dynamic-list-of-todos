type TodoFilterProps = {
  onFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  filter: string;
  query: string;
  onQuery: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteQuery: () => void;
};

export const TodoFilter = ({
  onFilter,
  filter,
  query,
  onQuery,
  onDeleteQuery,
}: TodoFilterProps) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select data-cy="statusSelect" value={filter} onChange={onFilter}>
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
        value={query}
        onChange={onQuery}
        className="input"
        placeholder="Search..."
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
            onClick={onDeleteQuery}
          />
        </span>
      )}
    </p>
  </form>
);
