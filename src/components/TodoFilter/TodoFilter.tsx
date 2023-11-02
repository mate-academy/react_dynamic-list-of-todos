import React from 'react';
import { Selected } from '../../types/Selected';

type Props = {
  selectedOption: string,
  onSelect: (val: string) => void,
  query: string,
  onInput: (val: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  selectedOption,
  onSelect,
  query,
  onInput,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedOption}
            onChange={(event) => onSelect(event.target.value)}
          >
            <option value={Selected.All}>All</option>
            <option value={Selected.Active}>Active</option>
            <option value={Selected.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          value={query}
          className="input"
          placeholder="Search..."
          onChange={(event) => onInput(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {/* eslint-disable jsx-a11y/control-has-associated-label */}
          {query && (
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => onInput('')}
            />
          )}

        </span>
      </p>
    </form>
  );
};
