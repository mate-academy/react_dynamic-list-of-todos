import React, { useCallback } from 'react';

type Props = {
  selectedStatus: Status;
  query: string;
  onStatusSelect: (status: Status) => void;
  onQueryChange: (query: string) => void;
};

type Status = 'all' | 'active' | 'completed';

const StatusOption: React.FC<{ value: Status; text: string }> = React.memo(
  ({ value, text }) => <option value={value}>{text}</option>,
);

StatusOption.displayName = 'StatusOption';

export const TodoFilter: React.FC<Props> = ({
  selectedStatus,
  query,
  onStatusSelect,
  onQueryChange,
}) => {
  const handleStatusSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onStatusSelect(event.target.value as Status);
    },
    [onStatusSelect],
  );

  const handleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onQueryChange(event.target.value);
    },
    [onQueryChange],
  );

  const resetQuery = useCallback(() => {
    onQueryChange('');
  }, [onQueryChange]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedStatus}
            onChange={handleStatusSelect}
          >
            <StatusOption value="all" text="All" />
            <StatusOption value="active" text="Active" />
            <StatusOption value="completed" text="Completed" />
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
          onChange={handleQueryChange}
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
              onClick={resetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
