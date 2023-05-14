import { FC, ChangeEvent } from 'react';
import { FilterBy } from '../../types/FilterBy';

interface Props {
  status: string;
  query: string;
  onSetStatus: (selectedStatus: FilterBy) => void;
  onSetQuery: (query: string) => void;
  onReset: () => void;
}

export const TodoFilter: FC<Props> = ({
  status,
  query,
  onSetStatus,
  onSetQuery,
  onReset,
}) => {
  const handleSelectStatus = ((event: ChangeEvent<HTMLSelectElement>) => {
    onSetStatus(event.target.value as FilterBy);
  });

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleSelectStatus}
          >
            <option value={FilterBy.ALL}>All</option>
            <option value={FilterBy.ACTIVE}>Active</option>
            <option value={FilterBy.COMPLETED}>Completed</option>
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
          onChange={(event) => onSetQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onReset}
            />
          )}

        </span>
      </p>
    </form>
  );
};
