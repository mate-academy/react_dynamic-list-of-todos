interface Props {
  value: string;
  changeFilter: (string: string) => void;
  changeInput: (string: string) => void;
}

enum FilterOptions {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodoFilter: React.FC<Props> = ({
  value,
  changeFilter,
  changeInput,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => changeFilter(event.target.value)}
        >
          {Object.keys(FilterOptions).map(key => (
            <option
              value={key}
              key={key}
            >
              {key}
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
        onChange={(event) => changeInput(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {value
          && (
            <button
              data-cy="clearSearchButton"
              aria-label="delete"
              type="button"
              className="delete"
              onClick={() => changeInput('')}
            />
          )}
      </span>
    </p>
  </form>
);
