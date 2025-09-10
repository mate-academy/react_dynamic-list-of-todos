type Props = {
  onStatusChange: (value: string) => void;
  onQueryChange: (value: string) => void;
  selectValue: string;
  inputValue: string;
};

export const TodoFilter: React.FC<Props> = ({
  onStatusChange,
  onQueryChange,
  selectValue,
  inputValue,
}) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={selectValue}
            data-cy="statusSelect"
            onChange={handleSelect}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={inputValue}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handleInput}
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
              onClick={() => {
                onQueryChange('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
