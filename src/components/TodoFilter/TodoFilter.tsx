import debounce from 'lodash.debounce';
import React from 'react';

type Props = {
  handleStatusFilterChange: (value: string) => void;
  handleFilterChange: (value: string) => void;
};

export const TodoFilter = React.memo(
  ({ handleStatusFilterChange, handleFilterChange }: Props) => {
    const [selectFilter, setSelectFilter] = React.useState('all');
    const [query, setQuery] = React.useState('');

    const debouncedFilterChange = React.useMemo(
      () =>
        debounce((value: string) => {
          handleFilterChange(value);
        }, 300),
      [handleFilterChange],
    );

    const handleQueryChange = (value: string) => {
      setQuery(value);
      debouncedFilterChange(value);
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={selectFilter}
              onChange={e => {
                setSelectFilter(e.target.value);
                handleStatusFilterChange(e.target.value);
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
            onChange={event => handleQueryChange(event.target.value)}
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
                onClick={() => handleQueryChange('')}
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);

TodoFilter.displayName = 'TodoFilter';
