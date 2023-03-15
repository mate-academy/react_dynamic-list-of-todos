import React from 'react';
import { SelectedName } from '../../types/SelectedName';

type Props = {
  setFilterBy: (filterBy: SelectedName) => void
  filterBy: SelectedName
  query: string,
  setQuery: (query: string) => void
};

export const TodoFilter: React.FC<Props> = ({
  filterBy,
  setFilterBy,
  query,
  setQuery,
}) => {
  return (
    <form className="field has-addons" onSubmit={e => e.preventDefault()}>
      <p className="control">
        <span className="select">
          <select
            value={filterBy}
            onChange={({ target }) => setFilterBy(target.value as SelectedName)}
            data-cy="statusSelect"
          >
            <option value={SelectedName.All}>{SelectedName.All}</option>
            <option value={SelectedName.Active}>{SelectedName.Active}</option>
            <option value={SelectedName.Completed}>
              {SelectedName.Completed}
            </option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="input"
          placeholder="Search..."
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query

        && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              value={query}
              className="delete"
              onClick={() => setQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
