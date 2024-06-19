import { useState } from 'react';
import { OnFilterChange, OnFilterSelect } from '../../types/functions';
import { FilterOption } from '../../types/variables';

type Props = {
  filterOption: FilterOption;
  onFilterSelect: OnFilterSelect;
  onFilterChange: OnFilterChange;
};

export const TodoFilter: React.FC<Props> = ({
  filterOption,
  onFilterSelect,
  onFilterChange,
}) => {
  const [query, setQuery] = useState('');

  const handleFilterSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterSelect(event.currentTarget.value as FilterOption);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.currentTarget.value;

    setQuery(newQuery);
    onFilterChange(newQuery);
  };

  const handleCancel = () => {
    setQuery('');
    onFilterChange('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterOption}
            onChange={handleFilterSelect}
          >
            <option value={FilterOption.All}>All</option>
            <option value={FilterOption.Active}>Active</option>
            <option value={FilterOption.Completed}>Completed</option>
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
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleCancel}
            />
          </span>
        )}
      </p>
    </form>
  );
};
