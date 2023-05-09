/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

type Props = {
  onSelectChange: (condition: boolean | null) => void;
  onQueryChange: (query: string) => void;
  query: string;
};

export const TodoFilter: React.FC<Props> = React.memo(
  ({ onSelectChange, onQueryChange, query }) => {
    const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
      switch (event.target.value) {
        case 'all':
          onSelectChange(null);
          break;

        case 'active':
          onSelectChange(false);
          break;

        case 'completed':
          onSelectChange(true);
          break;

        default:
          break;
      }
    };

    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select onChange={handleSelect} data-cy="statusSelect">
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
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            className="input"
            placeholder="Search..."
          />
          <span className="icon is-left">
            <i className="fas fa-magnifying-glass" />
          </span>

          {query.length > 0 && (
            <span className="icon is-right" style={{ pointerEvents: 'all' }}>
              {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
              <button
                data-cy="clearSearchButton"
                type="button"
                className="delete"
                onClick={() => onQueryChange('')}
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);
