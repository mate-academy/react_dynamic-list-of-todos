import { useState } from 'react';
import { FilterCriteria, Status } from '../../types/otherTypes';

type Props = {
  onFilterChange: (filterCriteria: FilterCriteria) => void;
};

export const TodoFilter: React.FC<Props> = ({ onFilterChange }) => {
  const [status, setStatus] = useState<Status>(Status.All);
  const [searchInput, setSearchInput] = useState('');

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = event.target.value as Status;

    setStatus(newStatus);
    onFilterChange({ status: newStatus, searchInput });
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newSearchInput = event.target.value;

    setSearchInput(newSearchInput);
    onFilterChange({ status, searchInput: newSearchInput });
  };

  const handleClearSearch = () => {
    setSearchInput('');
    onFilterChange({ status, searchInput: '' });
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
          value={searchInput}
          onChange={handleSearchInputChange}
        />
        <span className="icon is-left">
          <i className="fas fa-search" />
        </span>
        {searchInput && (
          <span className="icon is-right">
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          </span>
        )}
      </p>
    </form>
  );
};
