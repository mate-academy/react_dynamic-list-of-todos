import { ChangeEvent, useCallback, useState } from 'react';
import { Filter } from '../../enums/Filter';

type Props = {
  onFilterChange: (newFilter: Filter) => void;
  onQueryChange: (newQuery: string) => void;
};

export const TodoFilter = ({ onFilterChange, onQueryChange }: Props) => {
  const [query, setQuery] = useState('');

  const handleFilterChange = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const newFilter = event.target.value as Filter;

      onFilterChange(newFilter);
    },
    [onFilterChange],
  );

  const handleQueryChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const newQuery = event.target.value;

      setQuery(newQuery);

      onQueryChange(newQuery);
    },
    [onQueryChange],
  );

  const handleQueryClear = useCallback(() => {
    setQuery('');
    onQueryChange('');
  }, [onQueryChange]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            onChange={handleFilterChange}
            data-cy="statusSelect"
            defaultValue={Filter.All}
          >
            <option value={Filter.All}>All</option>
            <option value={Filter.Active}>Active</option>
            <option value={Filter.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          onChange={handleQueryChange}
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <button
              onClick={handleQueryClear}
              data-cy="clearSearchButton"
              type="button"
              className="delete"
            />
          )}
        </span>
      </p>
    </form>
  );
};
