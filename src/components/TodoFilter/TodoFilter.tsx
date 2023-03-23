import { ChangeEvent, useState, useEffect } from 'react';
import { Filters } from '../../helpers';

type Props = {
  setFilterBy: (filterBy: Filters) => void,
  setQuery: (query: string) => void,
};

let timeoutId = 0;

export const TodoFilter: React.FC<Props> = ({
  setFilterBy,
  setQuery,
}) => {
  const [queryValue, setQueryValue] = useState('');
  const showClearSearch = queryValue !== '';

  useEffect(
    () => () => {
      clearTimeout(timeoutId);
    },
    [],
  );

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>) => {
    switch (event.target.value) {
      case Filters.All:
        setFilterBy(Filters.All);
        break;
      case Filters.Active:
        setFilterBy(Filters.Active);
        break;
      case Filters.Completed:
        setFilterBy(Filters.Completed);
        break;
      default:
        setFilterBy(Filters.All);
    }
  };

  const handleClearSearch = () => {
    setQuery('');
    setQueryValue('');
  };

  const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQueryValue(value);
    clearTimeout(timeoutId);
    timeoutId = window.setTimeout(
      () => setQuery(value.trim().toLowerCase()),
      500,
    );
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
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
          value={queryValue}
          onChange={handleQueryChange}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {showClearSearch && (
            /* eslint-disable-next-line jsx-a11y/control-has-associated-label */
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
