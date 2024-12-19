interface TodoFilterProps {
  filterStatusValue: string;
  filterSearchValue: string;
  handleFilterStatusChange: (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => void;
  handleFilterSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleCleanSearch: () => void;
  isShowClearButton: boolean;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  filterSearchValue,
  filterStatusValue,
  handleCleanSearch,
  handleFilterSearch,
  handleFilterStatusChange,
  isShowClearButton,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={handleFilterStatusChange}
          value={filterStatusValue}
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
        value={filterSearchValue}
        onChange={handleFilterSearch}
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {isShowClearButton && (
          <button
            data-cy="clearSearchButton"
            onClick={handleCleanSearch}
            type="button"
            className="delete"
          />
        )}
      </span>
    </p>
  </form>
);
