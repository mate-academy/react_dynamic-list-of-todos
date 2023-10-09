type Props = {
  filterByQuery: string,
  setFilterByQuery: (s: string) => void,
  filterBySelect: string,
  setFilterBySelect: (s: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterByQuery,
  setFilterByQuery,
  filterBySelect,
  setFilterBySelect,
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      className="field has-addons"
      onSubmit={handleSubmit}
    >
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBySelect}
            onChange={(e) => setFilterBySelect(e.target.value)}
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
          value={filterByQuery}
          onChange={(e) => {
            setFilterByQuery(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {
            filterByQuery && (
              /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => setFilterByQuery('')}
              />
            )
          }
        </span>
      </p>
    </form>
  );
};
