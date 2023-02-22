type Props = {
  searchQuery: string;
  onSearchQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetSearchQuery: () => void;
  sortType: string;
  setSortType: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  searchQuery,
  onSearchQueryChange,
  resetSearchQuery,
  sortType,
  setSortType,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={sortType}
            onChange={(event) => setSortType(event.target.value)}
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
          className="input"
          value={searchQuery}
          onChange={onSearchQueryChange}
          data-cy="searchInput"
          type="text"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              className="delete"
              onClick={resetSearchQuery}
              data-cy="clearSearchButton"
              type="button"
            />
          </span>
        )}
      </p>
    </form>
  );
};
