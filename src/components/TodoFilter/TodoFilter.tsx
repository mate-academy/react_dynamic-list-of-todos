interface FilterProps {
  inputValue: string;
  setiInputValue(inputValue: string): void;
  setQueryFilter(queryFilter: string): void;
}

export const TodoFilter: React.FC<FilterProps> = ({
  inputValue,
  setiInputValue,
  setQueryFilter,
}) => {
  const filterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQueryFilter(event.target.value);
  };

  const filterInputValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setiInputValue(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select onChange={filterSelect} data-cy="statusSelect">
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={inputValue}
          onChange={filterInputValue}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {inputValue !== '' && (
            <button
              onClick={() => setiInputValue('')}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
