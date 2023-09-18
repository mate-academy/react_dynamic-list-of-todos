import React from 'react';
import { TodosFilter } from '../../types/TodosFilter';

type Props = {
  query: string;
  filter: TodosFilter;
  onQueryChange: (value: string) => void;
  onFilterChange: (value: TodosFilter) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  filter,
  onQueryChange,
  onFilterChange,
}) => {
  const handleReset = () => {
    onQueryChange('');
    onFilterChange(TodosFilter.All);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            className="is-capitalized"
            value={filter}
            onChange={event => (
              onFilterChange(event?.target.value as TodosFilter)
            )}
          >
            {Object.values(TodosFilter).map(value => (
              <option
                value={value}
                key={value}
              >
                {value}
              </option>
            ))}
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
          onChange={(event) => onQueryChange(event.target.value)}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="Clear Search"
              onClick={handleReset}
            />
          )}
        </span>
      </p>
    </form>
  );
};
