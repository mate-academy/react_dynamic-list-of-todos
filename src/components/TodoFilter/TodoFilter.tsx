type Props = {
  searchValue: string;
  setSortBy: (value: string) => void;
  setSearchValue: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  searchValue,
  setSortBy,
  setSearchValue,
}) => {
  const handleChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { target: { value } } = event;

    setSortBy(value);
  };

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { target: { value } } = event;

    setSearchValue(value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChangeSelect}>
            <option value="all">
              All
            </option>

            <option value="active">
              Active
            </option>

            <option value="completed">
              Completed
            </option>
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
          onChange={handleChangeInput}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {searchValue && (
            <button
              aria-label="reset query"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchValue('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
