import React from 'react';
import { StatusSelect } from '../../types/StatusSelect';

type Props = {
  query: string;
  setQuery: (value: string) => void;
  setStatusSelect: (value: string) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  setStatusSelect,
}) => {
  const statusOptions = [
    { value: StatusSelect.All, label: 'All' },
    { value: StatusSelect.Active, label: 'Active' },
    { value: StatusSelect.Completed, label: 'Completed' },
  ];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(e) => setStatusSelect(e.target.value)}
          >
            {statusOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
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
          onChange={(event) => setQuery(event.target.value)}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        <span className="icon is-right" style={{ pointerEvents: 'all' }}>
          {query.length > 0 && (
            // eslint-disable-next-line jsx-a11y/control-has-associated-label
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setQuery('')}
            />
          )}
        </span>
      </p>
    </form>
  );
};
