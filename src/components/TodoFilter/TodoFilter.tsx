type Props = {
  value: string;
  filterOption: string;
  onChange: (query: string) => void;
  onSelect: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  value,
  filterOption,
  onChange,
  onSelect,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={filterOption}
          data-cy="statusSelect"
          onChange={event => onSelect(event.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        value={value}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
        onChange={event => onChange(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {value.length > 0 && (
          <button
            onClick={() => onChange('')}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        )}
      </span>
    </p>
  </form>
);
