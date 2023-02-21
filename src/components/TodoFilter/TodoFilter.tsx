import React from 'react';
import { SelectValue } from '../../types/SelectValue';

type Props = {
  handleSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void,
  query: string,
  handleInput: (event: React.ChangeEvent<HTMLInputElement>) => void,
  clearInput: () => void,
};

export const TodoFilter: React.FC<Props> = React.memo(({
  handleSelect, query, handleInput, clearInput,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={handleSelect}
          >
            <option value={SelectValue.ALL}>All</option>
            <option value={SelectValue.ACTIVE}>Active</option>
            <option value={SelectValue.COMPLETED}>Completed</option>
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
          onChange={handleInput}
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
              onClick={clearInput}
            />
          </span>
        )}
      </p>
    </form>
  );
});
