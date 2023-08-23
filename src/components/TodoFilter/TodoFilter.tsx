import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  query: string;
  setFilter: (value: Status) => void;
  setQuery: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  setFilter, setQuery, query,
}) => {
  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as Status);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleQueryClear = () => {
    setQuery('');
  };

  const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleFilterChange}
          >
            {(Object.keys(Status) as Array<keyof typeof Status>).map(key => (
              <option
                value={Status[key]}
                key={key}
              >
                {capitalizeFirstLetter(key)}
              </option>
            ))}
          </select>

        </span>
      </p>

      <p className="
        control
        is-expanded
        has-icons-left
        has-icons-right"
      >
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

        {query && (
          <span
            className="icon is-right"
            style={{ pointerEvents: 'all' }}
          >
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleQueryClear}
            />
          </span>
        )}
      </p>
    </form>
  );
};
