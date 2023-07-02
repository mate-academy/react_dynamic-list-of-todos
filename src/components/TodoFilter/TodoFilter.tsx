import React, { memo } from 'react';

type Props = {
  query: string;
  setQuery: (searchQuery: string) => void;
  applyQuery: (searchQuery: string) => void;
  isTodoCompleted: string;
  setIsTodoComlpeted: (status: string) => void;
};

export const TodoFilter: React.FC<Props> = memo(({
  query,
  setQuery,
  applyQuery,
  isTodoCompleted,
  setIsTodoComlpeted,
}) => {
  const handleQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const normalizedQuery = event.target.value.toLowerCase().trim();

    setQuery(event.target.value);
    applyQuery(normalizedQuery);
  };

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsTodoComlpeted(event.target.value);
  };

  const handleClearButton = () => {
    setQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={isTodoCompleted}
            onChange={handleSelect}
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
          onChange={handleQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query !== ''
            && (
              // eslint-disable-next-line jsx-a11y/control-has-associated-label
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={handleClearButton}
              />
            )}

        </span>
      </p>
    </form>
  );
});
