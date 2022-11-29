import { useCallback, useState } from 'react';

type Props = {
  onChangeQuery: (query: string) => void;
  onChangeStatus: (status: string) => void;
  statusOptions: string[];
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  onChangeQuery,
  onChangeStatus,
  statusOptions,
  query,
}) => {
  const [selectedStatus, setSelectedStatus] = useState(statusOptions[0]);

  const handleStatusChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChangeStatus(event.target.value);
      setSelectedStatus(event.target.value);
    },
    [],
  );

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            {statusOptions.map(status => (
              <option value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          className="input"
          placeholder="Search..."
          onChange={(event) => onChangeQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {(query.length > 0)
          && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => (onChangeQuery(''))}
              />
            </span>
          )}
      </p>
    </form>
  );
};
