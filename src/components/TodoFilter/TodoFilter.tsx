type Props = {
  inputValue: string,
  selectedFilter: string,
  onChangeInput: (newValue: string) => void,
  onSelectStatus: (newValue: string) => void
};

export const TodoFilter: React.FC<Props> = ({
  inputValue,
  selectedFilter,
  onSelectStatus = () => { },
  onChangeInput = () => { },
}) => {
  const statuses = ['All', 'Active', 'Completed'];

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeInput(event.target.value);
  };

  const handleClearButton = () => {
    onChangeInput('');
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectStatus(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedFilter}
            onChange={handleSelect}
          >
            {statuses.map(status => (
              <option
                value={status.toLowerCase()}
                key={status}
              >
                {status}
              </option>
            ))}
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
          onChange={handleSearch}
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
            onClick={handleClearButton}
          />
        </span>
      </p>
    </form>
  );
};
