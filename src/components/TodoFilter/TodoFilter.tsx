interface Props {
  onSelectChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  query: string;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  resetInput: () => void;
}

export const TodoFilter: React.FC<Props> = ({
  onSelectChange,
  query,
  onInputChange,
  resetInput,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={onSelectChange}>
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={onInputChange}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetInput}
            />
          )}
        </span>
      </p>
    </form>
  );
};
