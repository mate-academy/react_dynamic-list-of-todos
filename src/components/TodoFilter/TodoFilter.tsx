import debounce from 'lodash.debounce';
import { useCallback, useState } from 'react';

import { FilterStatus } from '../../types/FilterStatus';

type Props = {
  filteredBy: FilterStatus,
  setFilteredValue: (value: FilterStatus) => void
  setAppliedQuery: (query: string) => void
};

export const TodoFilter: React.FC<Props> = ({
  setFilteredValue,
  filteredBy,
  setAppliedQuery,
}) => {
  const [query, setQuery] = useState('');
  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilteredValue(e.target.value as FilterStatus);
  };

  const applyQuery = useCallback((value) => debounce(() => {
    setAppliedQuery(value);
  }, 1000)(), [setAppliedQuery]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    applyQuery(e.target.value);
  };

  const handleClearSearch = () => {
    setQuery('');
    applyQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filteredBy}
            onChange={handleSelect}
          >
            <option
              value={FilterStatus.All}
            >
              {FilterStatus.All}
            </option>
            <option
              value={FilterStatus.Active}
            >
              {FilterStatus.Active}
            </option>
            <option
              value={FilterStatus.Completed}
            >
              {FilterStatus.Completed}
            </option>
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
          onChange={handleOnChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearSearch}
            />
          )}
        </span>
      </p>
    </form>
  );
};
