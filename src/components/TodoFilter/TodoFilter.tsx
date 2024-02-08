interface Props {
  setFilterOptionValue: (param: string) => void,
  filterInputValue: string,
  setFilterInputValue: (param: string) => void,
}

export const TodoFilter: React.FC<Props> = ({
  setFilterOptionValue,
  filterInputValue,
  setFilterInputValue,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={event => setFilterOptionValue(event.currentTarget.value)}
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
        value={filterInputValue}
        onChange={event => setFilterInputValue(event.currentTarget.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {!!filterInputValue && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSerchButton"
            type="button"
            className="delete"
            onClick={() => setFilterInputValue('')}
          />
        )}
      </span>
    </p>
  </form>
);
