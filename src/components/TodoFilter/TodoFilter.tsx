type Props = {
  filter: {
    query: string;
    sort: string;
  },
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  setFilter: (arg: any) => void;
};

export const TodoFilter: React.FC<Props> = ({ filter, setFilter }) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={filter.sort}
          onChange={event => setFilter({ ...filter, sort: event.target.value })}
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
        type="text"
        className="input"
        placeholder="Search..."
        value={filter.query}
        onChange={e => setFilter({ ...filter, query: e.target.value })}

      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {filter.query && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            aria-label="delete"
            type="button"
            className="delete"
            onClick={() => setFilter({ ...filter, query: '' })}
          />
        </span>
      )}
    </p>
  </form>
);
