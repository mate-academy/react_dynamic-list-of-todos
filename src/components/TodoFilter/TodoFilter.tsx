type Props = {
  onChangeSelect: (value: string) => void,
  value: string,
  onChangeSearchValue: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  onChangeSelect,
  onChangeSearchValue,
  value,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(e) => onChangeSelect(e.target.value)}
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
        onChange={(e) => onChangeSearchValue(e.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      {value && (
        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => onChangeSearchValue('')}
          />
        </span>
      )}
    </p>
  </form>
);
