import React, { Dispatch, SetStateAction } from 'react';
import { Filters } from '../../types/Filters';

type Props = {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
  status: Filters;
  setStatus: Dispatch<SetStateAction<Filters>>;
};

export const TodoFilter: React.FC<Props> = props => {
  const { query, setQuery, setStatus } = props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => setStatus(event.target.value as Filters)}
          >
            <option value={Filters.ALL}>All</option>
            <option value={Filters.ACTIVE}>Active</option>
            <option value={Filters.COMPLETED}>Completed</option>
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
          onChange={event => setQuery(event.target.value)}
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
