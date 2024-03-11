import React from 'react';
import { Status } from '../../types/Status';

type Props = {
  filter: Status;
  query: string;
  setFilter: (value: Status) => void;
  setQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  filter,
  query,
  setFilter,
  setQuery,
}) => {
  const handlerInputQuery = (elemt: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(elemt.target.value);
  };

  const hadlerButtonClose = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={filter}
            onChange={elemt => setFilter(elemt.target.value as Status)}
            data-cy="statusSelect"
          >
            <option value={Status.All}>All</option>
            <option value={Status.Active}>Active</option>
            <option value={Status.Completed}>Completed</option>
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
          onChange={handlerInputQuery}
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
              onClick={hadlerButtonClose}
            />
          </span>
        )}
      </p>
    </form>
  );
};
