import { useCallback, useRef } from 'react';

interface Props {
  applyStatusQuery: (query: string) => void;
  applyTitleQuery: (query: string) => void;
}

export const TodoFilter: React.FC<Props> = ({
  applyStatusQuery,
  applyTitleQuery,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleStatusQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLSelectElement>) => {
      applyStatusQuery(event.target.value.trim().toLowerCase());
    },
    [applyStatusQuery],
  );

  const handleTitleQueryChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      applyTitleQuery(event.target.value.trim().toLowerCase());
    },
    [applyTitleQuery],
  );

  const handleClearQuery = useCallback(() => {
    applyTitleQuery('');

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [applyTitleQuery, inputRef]);


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
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
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
