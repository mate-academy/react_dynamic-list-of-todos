type Props = {
  filterTodos: string;
  query: string;
  handleChangeQuery: (value: string) => void;
  handleChangeFilter: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterTodos,
  query,
  handleChangeQuery,
  handleChangeFilter,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterTodos}
          onChange={(e) => handleChangeFilter(e.target.value)}
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
        name="query"
        className="input"
        placeholder="Search..."
        value={query}
        onChange={(e) => handleChangeQuery(e.target.value)}
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
            onClick={() => handleChangeQuery('')}
          />
        </span>
      )}
    </p>
  </form>
);
