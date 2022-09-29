type Props = {
  filterBy: string,
  inputValue: string,
  handleSelect: (value: string) => void;
  handleInput: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  inputValue,
  handleSelect,
  handleInput,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => handleSelect(event.target.value)}
            value={filterBy}
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
          value={inputValue}
          onChange={(event) => handleInput(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {inputValue.length !== 0 && (
            <button
              aria-label="button"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => handleInput('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
