import React from 'react';
import { FilterBy } from '../../types/Filter';

type Props = {
  changeSort: (type: FilterBy) => void;
  query: string;
  changeQuery: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  changeSort,
  query,
  changeQuery,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleChangeQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    changeQuery(event.target.value);
  };

  return (
    <form className="field has-addons" onSubmit={handleSubmit}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              changeSort(e.target.value as FilterBy)
            }
          >
            <option value={FilterBy.all}>All</option>
            <option value={FilterBy.active}>Active</option>
            <option value={FilterBy.completed}>Completed</option>
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

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => changeQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
