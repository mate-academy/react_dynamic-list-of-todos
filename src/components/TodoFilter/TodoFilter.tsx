export enum STATUSES {
  COMPLETED = 'completed',
  ACTIVE = 'active',
  ALL = 'all',
}

interface FilterProps {
  setStatus: (value: string) => void;
  query: string;
  setQuery: (value: string) => void;
}
export const TodoFilter: React.FC<FilterProps> = props => {
  const { setStatus, query, setQuery } = props;

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setStatus(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleSelect}>
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
          onChange={event => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
            onClick={() => setQuery('')}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          </span>
        )}
      </p>
    </form>
  );
};
