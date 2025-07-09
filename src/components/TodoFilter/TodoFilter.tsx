type Props = {
  onSearchInputChange: (searchInput: string) => void;
  onFilterTypeChange: (filterType: string) => void;
  searchInput: string;
};

export const TodoFilter: React.FC<Props> = ({
  onSearchInputChange,
  onFilterTypeChange,
  searchInput,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => onFilterTypeChange(event.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={event => onSearchInputChange(event.target.value)}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={searchInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchInput && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              onClick={() => onSearchInputChange('')}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
