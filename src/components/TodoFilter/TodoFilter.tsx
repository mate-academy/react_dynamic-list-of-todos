type Props = {
  value: string,
  selectValue: string,
  onChange: (newValue: string) => void,
  onSelect: (newValue: string) => void
};

export const TodoFilter: React.FC<Props> = ({
  value,
  selectValue,
  onSelect = () => { },
  onChange = () => { },
}) => {
  const statuses = ['All', 'Active', 'Completed'];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectValue}
            onChange={event => onSelect(event.target.value)}
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
          value={value}
          onChange={event => onChange(event.target.value)}
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
            onClick={() => onChange('')}
          />
        </span>
      </p>
    </form>
  );
};
