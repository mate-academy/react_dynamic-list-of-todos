type Props = {
  selectOption: string
  setSelectOption: (v: string) => void,
  filterValue: string,
  setFilterValue: (v: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  selectOption,
  setSelectOption,
  filterValue,
  setFilterValue,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectOption}
            onChange={(event) => setSelectOption(event.target.value)}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={filterValue}
          onChange={(event) => setFilterValue(event.target.value)}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterValue.trim() && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            <input
              onClick={() => setFilterValue('')}
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
