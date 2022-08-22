interface Props {
  setComplitedSelect: (complitedSelect: string) => void,
  complitedSelect: string,
  setInputValue: (inputValue: string) => void,
  inputValue: string,
}

export const TodoFilter: React.FC<Props> = ({
  setComplitedSelect,
  complitedSelect,
  setInputValue,
  inputValue,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={complitedSelect}
            onChange={(event) => setComplitedSelect(event.target.value)}
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
          onChange={(event) => setInputValue(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setInputValue('')}
          />
        </span>
      </p>
    </form>
  );
};
