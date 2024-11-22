type Props = {
  setOptionsValue: (event: string) => void;
  setInputValue: (event: string) => void;
  inputValue: string;
};

export const TodoFilter: React.FC<Props> = ({
  setOptionsValue,
  setInputValue,
  inputValue,
}) => {
  function handleOptionValue(event: React.ChangeEvent<HTMLSelectElement>) {
    setOptionsValue(event.target.value);
  }

  function handleInputValue(event: React.ChangeEvent<HTMLInputElement>) {
    setInputValue(event.target.value);
  }

  function clear() {
    setInputValue('');
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleOptionValue}>
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
          onChange={handleInputValue}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {inputValue && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
