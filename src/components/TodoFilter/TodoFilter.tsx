type Props = {
  filter: string;
  setFilter: (filter: string) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
};

export const TodoFilter = ({
  filter,
  setFilter,
  searchString,
  setSearchString,
}: Props) => (
  <form
    className="field has-addons"
    data-cy="todoFilterForm"
    onSubmit={e => e.preventDefault()}
  >
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filter}
          onChange={e => setFilter(e.target.value)}
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
        value={searchString}
        onChange={e => setSearchString(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {searchString && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            aria-label="Clear search"
            onClick={() => setSearchString('')}
          />
        </span>
      )}
    </p>
  </form>
);
