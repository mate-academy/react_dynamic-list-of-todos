interface Props {
  setFilterBy: (value: string) => void;
  filterBy: string,
  setQuery: (value: string) => void;
  query: string;
}
export const TodoFilter: React.FC<Props> = ({
  setFilterBy,
  filterBy,
  setQuery,
  query,
}) => {
  const handlerChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => (
    setFilterBy(event.target.value));
  const handlerChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => (
    setQuery(event.target.value));
  const handlerReset = () => setQuery('');

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={handlerChangeSelect}
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
          onChange={handlerChangeInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length > 0
            && (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handlerReset}
              />
            )}
        </span>
      </p>
    </form>
  );
};
