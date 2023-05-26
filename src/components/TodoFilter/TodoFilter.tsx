import { FC } from 'react';
import { Status } from '../../types/Status';

type Props = {
  status: Status;
  setStatus: (status: Status) => void;
  query: string;
  setQuery: (status: string) => void;
};

export const TodoFilter: FC<Props> = ({
  status,
  setStatus,
  query,
  setQuery,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={(event) => setStatus(event.target.value as Status)}
        >
          <option value={Status.All}>All</option>
          <option value={Status.Active}>Active</option>
          <option value={Status.Completed}>Completed</option>
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
        onChange={(event) => setQuery(event.target.value)}
      />
      <span className="icon is-left">
        <i className="fas fa-magnifying-glass" />
      </span>

      <span className="icon is-right" style={{ pointerEvents: 'all' }}>
        {query && (
          <button
            aria-label="clear search"
            data-cy="clearSearchButton"
            type="button"
            className="delete"
            onClick={() => setQuery('')}
          />
        )}

      </span>
    </p>
  </form>
);
