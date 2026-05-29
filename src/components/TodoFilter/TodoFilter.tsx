import React, { ChangeEvent } from 'react';
import { StatusEnum } from '../../types/servises/StatusEmum';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  status,
  setStatus,
}) => {
  function handleChangeQuery(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    setQuery(value);
  }

  function handleClearQuery() {
    setQuery('');
  }

  function handleChangeStatus(event: ChangeEvent<HTMLSelectElement>) {
    const value = event.target.value;

    setStatus(value);
  }

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleChangeStatus}
          >
            <option value={StatusEnum.all}>All</option>
            <option value={StatusEnum.active}>Active</option>
            <option value={StatusEnum.completed}>Completed</option>
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
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={handleClearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
};
