import debounce from 'lodash.debounce';
import React, { useCallback } from 'react';

type Props = {
  setFilter: (filter: string) => void;
  setQuery: (query: string) => void;
  setDebouncedQuery: (query: string) => void;
  query: string;
};
export const TodoFilter: React.FC<Props> = React.memo(({
  setFilter,
  setQuery,
  setDebouncedQuery,
  query,
}) => {
  const apllyDebouncedQuery = useCallback(
    debounce(setDebouncedQuery, 500), [],
  );

  // eslint-disable-next-line
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;

    setFilter(selectedValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const textOfQuery = event.target.value;

    setQuery(textOfQuery);
    apllyDebouncedQuery(textOfQuery.trim());
  };

  const clear = () => {
    setQuery('');
    setDebouncedQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelectChange}
          >
            <option
              value="all"
            >
              All
            </option>
            <option
              value="active"
            >
              Active
            </option>
            <option
              value="completed"
            >
              Completed
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
          onChange={handleInputChange}
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
              onClick={clear}
            />
          </span>
        )}
      </p>
    </form>
  );
});
