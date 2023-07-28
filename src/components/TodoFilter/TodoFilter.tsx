import React, { useEffect, useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { getEnumKeyByEnumValue } from '../../utils';
import { FilterBy } from '../../types/FilterBy';

type Props = {
  appliedFilter: FilterBy;
  onFilterChange: (status: FilterBy) => void;
  onQueryChange: (query: string) => void;
};

const TodoFilterComponent: React.FC<Props> = ({
  appliedFilter,
  onFilterChange,
  onQueryChange,
}) => {
  const [query, setQuery] = useState<string>('');
  const debouncedQuery = useDebounce<string>(query, 150);

  const handlerSelectFilterType = (value: string) => {
    const filterKey = getEnumKeyByEnumValue(FilterBy, value);

    if (filterKey) {
      onFilterChange(FilterBy[filterKey]);
    }
  };

  const handlerQueryChange = (inputValue: string) => {
    setQuery(inputValue);
  };

  const handlerClearQuery = () => {
    setQuery('');
  };

  useEffect(() => {
    onQueryChange(query);
  }, [debouncedQuery]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={appliedFilter}
            onChange={(e) => {
              handlerSelectFilterType(e.target.value);
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
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
          onChange={e => handlerQueryChange(e.target.value)}
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
              onClick={handlerClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};

export const TodoFilter = React.memo(TodoFilterComponent);
