import React, { useContext } from 'react';
import { ActiveSelector, TodoFilterProps } from '../../types/Types';
import { QueryContext } from '../../util/Store';

export const TodoFilter: React.FC<TodoFilterProps> = React.memo(
  function TodoFilter({ acitveSelector, setActiveSelector }) {
    const { query, setQuery } = useContext(QueryContext);

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={acitveSelector}
              onChange={event => setActiveSelector(event.target.value)}
            >
              <option value={ActiveSelector.All}>All</option>
              <option value={ActiveSelector.Active}>Active</option>
              <option value={ActiveSelector.Completed}>Completed</option>
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
            onChange={event => {
              setQuery(event.target.value.trimStart());
            }}
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
                onClick={() => setQuery('')}
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);
