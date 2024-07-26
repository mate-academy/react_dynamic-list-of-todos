import React, { useEffect, useState } from 'react';
import { Status } from '../../types/Status';
type Props = {
  status: Status;
  searchText: string;
  onFilterChange: (status: Status, searchText: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  searchText,
  onFilterChange,
}) => {
  const [localStatus, setLocalStatus] = useState<Status>(status);
  const [localSearchText, setLocalSearchText] = useState(searchText);

  useEffect(() => {
    onFilterChange(localStatus, localSearchText);
  }, [localStatus, localSearchText, onFilterChange]);

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLocalStatus(event.target.value as Status);
  };

  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSearchText(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          value={localSearchText}
          onChange={handleTextChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {localSearchText && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setLocalSearchText('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
