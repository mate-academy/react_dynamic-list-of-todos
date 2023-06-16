import { memo } from 'react';

type Props = {
  onInputChange: (value: string) => void;
  query: string;
  value: string
  onDeleteQuery: () => void;
  onFilterChange: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = memo(
  ({
    onInputChange,
    value,
    query,
    onDeleteQuery,
    onFilterChange,
  }) => {
    return (
      <form className="field has-addons">
        <p className="control">
          <span className="select">
            <select
              data-cy="statusSelect"
              value={value}
              onChange={(event) => onFilterChange(event.target.value)}
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
            onChange={(event) => onInputChange(event.target.value)}
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
                onClick={onDeleteQuery}
              />
            </span>
          )}
        </p>
      </form>
    );
  },
);
