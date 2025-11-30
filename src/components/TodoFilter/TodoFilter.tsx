type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selected: string;
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  onClick: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  value,
  onChange,
  selected,
  onSelectChange,
  onClick,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selected}
            onChange={onSelectChange}
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
          value={value}
          onChange={onChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {value && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClick}
            />
          )}
        </span>
      </p>
    </form>
  );
};
