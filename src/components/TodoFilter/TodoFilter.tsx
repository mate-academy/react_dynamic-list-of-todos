import { ChangeEvent } from 'react';
import { FilterTypes } from '../../types/Filter';

type Props = {
  filterBy: string
  setFilterBy: (str: FilterTypes) => void,
  query: string
  setQuery: (str: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  query,
  setQuery,
}) => {
  const handleSelect = (event: ChangeEvent<HTMLSelectElement>) => {
    const status = event.target.value as FilterTypes;

    setFilterBy(status);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterBy}
            onChange={handleSelect}
          >
            <option value={FilterTypes.All}>All</option>
            <option value={FilterTypes.Active}>Active</option>
            <option value={FilterTypes.Completed}>Completed</option>
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
          onChange={event => (
            setQuery(event.target.value)
          )}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length > 0 && (
            <button
              aria-label="Clear search query"
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
