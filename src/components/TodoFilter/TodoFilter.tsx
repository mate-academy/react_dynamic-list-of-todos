interface Props {
  value: string,
  handleInputQuery: (value: string) => void,
  onSelectedCategory: (category: string) => void,
}

export const TodoFilter: React.FC<Props> = ({
  value,
  handleInputQuery,
  onSelectedCategory,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={(event) => onSelectedCategory(event.target.value)}
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
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          handleInputQuery(event.target.value);
        }}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {value && (
          // eslint-disable-next-line jsx-a11y/control-has-associated-label
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => handleInputQuery('')}
          />
        )}
      </span>
    </p>
  </form>
);
