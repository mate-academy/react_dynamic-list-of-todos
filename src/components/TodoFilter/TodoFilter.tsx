import {Status} from '../../types/Status';

type Props = {
  status: Status;
  onStatusChange: (value: Status) => void;
  setQuery: (value: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  onStatusChange,
  setQuery,
  query,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={(event) => onStatusChange(event.target.value as Status)}
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={event => {
            setQuery(event.target.value);
          }}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>
        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              onClick={() => setQuery('')}
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
