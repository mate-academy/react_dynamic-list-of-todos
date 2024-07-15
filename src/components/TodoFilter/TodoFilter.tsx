import { Dispatch, FC, SetStateAction } from 'react';
import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  status: FilterStatus;
  setStatus: Dispatch<SetStateAction<FilterStatus>>;
};

export const TodoFilter: FC<Props> = ({
  query,
  setQuery,
  status,
  setStatus,
}) => (
  <form className="field has-addons">
    <p className="control">
      <span className="select">
        <select
          data-cy="statusSelect"
          value={status}
          onChange={event => setStatus(event.target.value as FilterStatus)}
        >
          <option value={FilterStatus.All}>All</option>
          <option value={FilterStatus.Active}>Active</option>
          <option value={FilterStatus.Completed}>Completed</option>
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
