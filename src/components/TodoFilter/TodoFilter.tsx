import { Status } from '../../enums/Status';

type Props = {
  query: string;
  onQueryChanged: (value: string) => void;
  filterStatus: string;
  onStatusChanged: (value: Status) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChanged: setQuery,
  filterStatus,
  onStatusChanged: setFilterStatus,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={filterStatus}
          onChange={event => setFilterStatus(event.target.value as Status)}
        >
          {Object.entries(Status).map(type => {
            const [key, value] = type;

            return (
              <option key={key} value={value}>
                {key}
              </option>
            );
          })}
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
