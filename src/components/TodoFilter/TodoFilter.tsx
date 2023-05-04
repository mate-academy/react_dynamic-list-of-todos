import React, { useState } from 'react';

interface Props {
  onSortConditionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  sortCondition: string;
  applyQuery: (value: string) => void;
}

export const TodoFilter: React.FC<Props> = React.memo(
  ({
    onSortConditionChange,
    sortCondition,
    applyQuery,
  }) => {
    const [query, setQuery] = useState('');
    const [isResetButtonActive, setIsResetButtonActive] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setQuery(value);
      applyQuery(value);
      setIsResetButtonActive(!!value);
    };

    const handleReset = () => {
      setQuery('');
      applyQuery('');
      setIsResetButtonActive(false);
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={sortCondition}
              onChange={onSortConditionChange}
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
            onChange={handleInputChange}
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            {isResetButtonActive && (
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                aria-label="Clear search"
                onClick={handleReset}
              />
            )}
          </span>
        </p>
      </form>
    );
  },
);
