import React from 'react';
import { Filter } from '../../types/FIlter';

type Props = {
  filter: Filter
  updateFilter: (newFilter: Filter) => void,
  query: string,
  updateQuery: (newQuery: string) => void
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  updateFilter,
  query,
  updateQuery,
}) => {
  const handlerSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    updateFilter(event.target.value as Filter);
  };

  const handlerSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateQuery(event.target.value);
  };

  return (
    <form
      className="field has-addons"
      onSubmit={event => event.preventDefault()}
    >
      <p className="control">
        <span className="select">
          <select
            value={filter}
            data-cy="statusSelect"
            onChange={handlerSelect}
          >
            {Object.values(Filter).map((option) => {
              const name = option.slice(0, 1).toUpperCase()
              + option.slice(1, option.length).toLowerCase();

              return (
                <option key={option} value={option}>
                  {name}
                </option>
              );
            })}
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          onChange={handlerSearch}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!query.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              aria-label="delete"
              onClick={() => updateQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
