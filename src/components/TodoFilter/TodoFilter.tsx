import { FC } from 'react';
import { FilterTypes } from '../../types/FilterTypes';

type Props = {
  setActivityFilter: (filterValue: FilterTypes) => void;
  setQuery: (value:string) => void;
  query: string,
};

export const TodoFilter: FC<Props> = ({
  setActivityFilter,
  setQuery,
  query,
}) => {
  const handleStatusSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActivityFilter(event.target.value as FilterTypes);
  };

  const handleQueryChange: React.ChangeEventHandler<HTMLInputElement>
  = (event) => {
    setQuery(event.target.value);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleStatusSelect}
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
          onChange={handleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          { query
          && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="clearSearchButton"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
