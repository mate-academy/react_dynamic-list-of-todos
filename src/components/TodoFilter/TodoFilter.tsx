interface Props {
  setFilter: (value: 'all' | 'active' | 'completed') => void;
  setSearch: (value: string) => void;
  search: string;
}

export const TodoFilter = ({ setFilter, setSearch, search }: Props) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={e =>
            setFilter(e.target.value as 'all' | 'active' | 'completed')
          }
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
        value={search}
        className="input"
        placeholder="Search..."
        onChange={e => setSearch(e.target.value.toLowerCase())}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {search && (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setSearch('')}
          />
        )}
      </span>
    </p>
  </form>
);
