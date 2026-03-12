type Props = {
  textSearch: string;
  handleFilterChoise: (value: string) => void;
  handleTextSearchInput: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  textSearch,
  handleFilterChoise,
  handleTextSearchInput,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          onChange={choice => handleFilterChoise(choice.target.value)}
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
        value={textSearch}
        onChange={input => handleTextSearchInput(input.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {!(textSearch === '') ? (
          <button
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => handleTextSearchInput('')}
          />
        ) : (
          ''
        )}
      </span>
    </p>
  </form>
);
