type Props = {
  onQueryChange: (changedQuery: string) => void;
  onApplyQuery: (newQuery: string) => void;
  onSelectChange: (changedSelect: string) => void;
  query: string;
  select: string;
};

export const TodoFilter: React.FC<Props> = ({
  onQueryChange,
  onApplyQuery,
  onSelectChange,
  query,
  select,
}) => {
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(e.target.value);
  };

  const handleQuery = (enteredText: string) => {
    onApplyQuery(enteredText);
    onQueryChange(enteredText);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={select}
            onChange={(e) => handleSelect(e)}
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
          value={query}
          onChange={(e) => handleQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {
          query && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                aria-label="removeButton"
                onClick={() => handleQuery('')}
              />
            </span>
          )
        }
      </p>
    </form>
  );
};
