import React from 'react';
import { State } from '../../types/Todo';

type Props = {
  query: string;
  state: State;
  onStateChanged: (state: State) => void;
  onQueryChanged: (query: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  state,
  onStateChanged,
  onQueryChanged,
}) => {
  const handleQueryChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQueryChanged(event.target.value);
  };

  const handleStateChanged = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onStateChanged(event.target.value as State);
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            value={state}
            data-cy="statusSelect"
            onChange={handleStateChanged}
          >
            <option value={State.All}>All</option>
            <option value={State.Active}>Active</option>
            <option value={State.Completed}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          value={query}
          onChange={handleQueryChanged}
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
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
              onClick={() => onQueryChanged('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
