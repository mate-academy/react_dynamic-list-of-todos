import React from 'react';
type Props = {
  onSelect: (value: string) => void;
  onQuery: (value: string) => void;
  selectedFilter: 'all' | 'active' | 'completed';
  query: string;
};

export const TodoFilter: React.FC<Props> = ({
  onSelect,
  onQuery,
  selectedFilter,
  query,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onQuery(event.target.value);
  };

  const clear = () => {
    onQuery('');
  };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={event => onSelect(event.target.value)}
            value={selectedFilter}
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
          onChange={handleChange}
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
              onClick={clear}
            />
          )}
        </span>
      </p>
    </form>
  );
};
