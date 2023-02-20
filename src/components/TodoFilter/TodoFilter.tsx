import React, { useCallback, useState } from 'react';
import { FilterType } from '../../types/FilterType';

type Props = {
  onFilter: (type: FilterType) => void;
  onApplyQuery: (event: string) => void;
};

export const TodoFilter: React.FC<Props> = React.memo(({
  onFilter,
  onApplyQuery,
}) => {
  const [query, setQuery] = useState('');

  const handleSelect = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onFilter(event.target.value as FilterType);
    },
    [],
  );

  const handleQueries = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      onApplyQuery(event.target.value);
    },
    [],
  );

  const resetQueries = useCallback(() => {
    setQuery('');
    onApplyQuery('');
  }, []);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              handleSelect(event);
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
          onChange={(event) => {
            handleQueries(event);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={resetQueries}
              aria-label="close modal"
            />
          )}
        </span>
      </p>
    </form>
  );
});
