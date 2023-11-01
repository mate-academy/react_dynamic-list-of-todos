import { ByStatus } from '../../types/ByStatus';

type Props = {
  setFiltredByStatus: (status: ByStatus) => void;
  setQuery: (status: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  setFiltredByStatus,
  setQuery,
  query,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => setFiltredByStatus(e.target.value as ByStatus)}
          >
            <option value={ByStatus.all}>All</option>
            <option value={ByStatus.activ}>Active</option>
            <option value={ByStatus.completed}>Completed</option>
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
          onChange={(e) => setQuery(e.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query.length > 0 && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
