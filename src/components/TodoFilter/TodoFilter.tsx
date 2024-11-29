type Props = {
  query: string;
  handleQueryChange: (value: string) => void;
  handleSelectChange: (value: string) => void;
  resetQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  handleQueryChange = () => {},
  handleSelectChange = () => {},
  resetQuery = () => {},
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => handleSelectChange(event.target.value)}
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
          value={query}
          onChange={event => handleQueryChange(event.target.value)}
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
