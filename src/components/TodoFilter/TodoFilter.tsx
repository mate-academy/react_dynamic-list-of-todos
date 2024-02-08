type Props = {
  query: string,
  setQueryHandler: (query: string) => void,
  setSortedHandler: (query: string) => void,
};

export const TodoFilter:React.FC<Props> = ({
  query, setQueryHandler, setSortedHandler,
}) => {
  const sortedHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortedHandler(e.target.value);
  };

  const handlerChangeFilterQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQueryHandler(e.target.value);
  };

  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={sortedHandler}>
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
          onChange={handlerChangeFilterQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query !== '' && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQueryHandler('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
