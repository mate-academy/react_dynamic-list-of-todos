type Props = {
  status: string,
  setStatus: (a:string) => void,
  query:string;
  setQuery:(a:string) => void
};

export const TodoFilter: React.FC<Props> = ({
  status,
  setStatus,
  query,
  setQuery,
}) => {
  const handleSelect = (event:React.ChangeEvent<HTMLSelectElement>) => (
    setStatus(event.target.value)
  );

  const handleInput = (event:React.ChangeEvent<HTMLInputElement>) => (
    setQuery(event.target.value)
  );

  const handleReset = () => {
    setQuery('');
    setStatus('all');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleSelect}
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
          onChange={handleInput}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleReset}
            />
          </span>
        )}

      </p>
    </form>
  );
};
