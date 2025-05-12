type Props = {
  searchValue: string;
  setSearchValue: (newValue: string) => void;
  selectValue: string;
  setSelectValue: (newValue: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  searchValue,
  selectValue,
  setSearchValue,
  setSelectValue,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={event => setSelectValue(event.target.value)}
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
          value={searchValue}
          onChange={event => setSearchValue(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchValue && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchValue('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
