import React, { memo } from 'react';

type Props = {
  selectStatus: string,
  onSelectStatus: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  query: string,
  onQueryChange: (value: string) => void,
};

export const TodoFilter: React.FC<Props> = memo(({
  selectStatus,
  onSelectStatus,
  query,
  onQueryChange,
}) => {
  const handleSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  const handleTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChange(event.target.value);
  };

  const reset = () => {
    onQueryChange('');
  };

  return (
    <form className="field has-addons" onSubmit={handleSubmit}>
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectStatus}
            onChange={onSelectStatus}
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
          onChange={handleTodo}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query && (
            <i
              aria-label="text"
              role="button"
              tabIndex={0}
              onKeyDown={reset}
              data-cy="clearSearchButton"
              className="delete"
              onClick={reset}
            />
          )}
        </span>
      </p>
    </form>
  );
});
