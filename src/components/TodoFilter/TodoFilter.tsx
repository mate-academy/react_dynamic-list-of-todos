import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  query: string
  setQuery: (value: string) => void;
  setFilter: (value: Status) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  setFilter,
}) => {
  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleChangeFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as Status);
  };

  const handleResetQuery = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleChangeFilter}>
            <option value={Status.all}>All</option>
            <option value={Status.active}>Active</option>
            <option value={Status.completed}>Completed</option>
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
          onChange={handleChangeQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleResetQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
