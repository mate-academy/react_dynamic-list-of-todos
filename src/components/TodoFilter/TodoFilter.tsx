import React, { ChangeEvent } from 'react';

type Props = {
  query: string;
  status: 'all' | 'active' | 'completed';
  onClearQuery: () => void;
  onChangeQuery: (newQuery: string) => void;
  onChangeStatus: (newStatus: 'all' | 'active' | 'completed') => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  status,
  onClearQuery,
  onChangeQuery,
  onChangeStatus,
}) => {
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  function handleQueryChange(event: ChangeEvent<HTMLInputElement>) {
    onChangeQuery(event.target.value);
  }

  function handleStatusChange(event: ChangeEvent<HTMLSelectElement>) {
    onChangeStatus(event.target.value as Props['status']);
  }

  return (
    <form className="field has-addons" onSubmit={handleSubmit}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={status}
            onChange={handleStatusChange}
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
          {query !== '' && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={onClearQuery}
            />
          )}
        </span>
      </p>
    </form>
  );
};
