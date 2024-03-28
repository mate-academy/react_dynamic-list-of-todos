// import { useState } from 'react';
// import { Todo } from '../../types/Todo';

export enum FilteredOptions {
  All = 'all',
  Active = 'active',
  Completed = 'completed',
}

interface Props {
  query: string;
  setQuery: (query: string) => void;
  filteredField: FilteredOptions;
  setFilterField: (filteredField: FilteredOptions) => void;
}

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  filteredField,
  setFilterField,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filteredField}
            data-cy="statusSelect"
            onChange={event => {
              setFilterField(event.target.value as FilteredOptions);
            }}
          >
            <option value={FilteredOptions.All}>All</option>
            <option value={FilteredOptions.Active}>Active</option>
            <option value={FilteredOptions.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={event => setQuery(event.target.value)}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
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
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
