type Props = {
  query: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  clearQuery: () => void;
  handleSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  handleChange = () => {},
  clearQuery = () => {},
  handleSelectChange = () => {},
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select onChange={handleSelectChange} data-cy="statusSelect">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </span>
    </p>

    <p className="control is-expanded has-icons-left has-icons-right">
      <input
        value={query}
        onChange={handleChange}
        data-cy="searchInput"
        type="text"
        className="input"
        placeholder="Search..."
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
        {query && (
          <button
            onClick={clearQuery}
            data-cy="clearSearchButton"
            type="button"
            className="delete"
          />
        )}
      </span>
    </p>
  </form>
);
