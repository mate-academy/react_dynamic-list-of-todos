import React, { useCallback, useRef } from 'react';

interface TodoFilterProps {
  onApplyStatusQuery: (query: string) => void;
  onApplyTitleQuery: (query: string) => void;
}

export const TodoFilter: React.FC<TodoFilterProps> = ({
  onApplyStatusQuery,
  onApplyTitleQuery,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStatusQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      onApplyStatusQuery(event.target.value.trim().toLowerCase());
    },
    [onApplyStatusQuery],
  );

  const handleTitleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onApplyTitleQuery(event.target.value.trim().toLowerCase());
    },
    [onApplyTitleQuery],
  );

  const handleClearQuery = useCallback(() => {
    onApplyTitleQuery('');

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [onApplyTitleQuery, inputRef]);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select data-cy="statusSelect" onChange={handleStatusQueryChange}>
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
          ref={inputRef}
          onChange={handleTitleQueryChange}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {inputRef?.current?.value && (
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
