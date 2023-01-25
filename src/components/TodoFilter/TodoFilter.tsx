/* eslint-disable jsx-a11y/control-has-associated-label */
type Props = {
  selectedOption: string
  searchQuery: string
  onChangeSelect: (selectedOption: string) => void
  onChangeSearch: (searchQuery: string) => void
};

export const TodoFilter: React.FC<Props> = ({
  selectedOption,
  searchQuery,
  onChangeSelect,
  onChangeSearch,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          value={selectedOption}
          onChange={(event) => onChangeSelect(event.target.value)}
          data-cy="statusSelect"
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
        value={searchQuery}
        onChange={(event) => onChangeSearch(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {
          searchQuery && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onChangeSearch('')}
            />
          )
        }
      </span>
    </p>
  </form>
);
