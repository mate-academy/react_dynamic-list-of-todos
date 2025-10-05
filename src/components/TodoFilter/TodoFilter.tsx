import React from 'react';

type Props = {
  status: 'all' | 'completed' | 'active';
  onStatusChange: (s: Props['status']) => void;

  query: string;
  onQueryChange: (value: string) => void;
  onClearQuery: () => void;
};

export const TodoFilter: React.FC<Props> = ({
  status,
  onStatusChange,
  query,
  onQueryChange,
  onClearQuery,
}) => {
  return (
    <form
      className="is-flex is-align-items-center is-justify-content-space-between"
      onSubmit={e => e.preventDefault()} // чтобы не перезагружалась страница
      data-cy="filterForm"
    >
      <div className="select" style={{ marginRight: 12 }}>
        <select
          value={status}
          onChange={e => onStatusChange(e.target.value as Props['status'])}
          data-cy="statusSelect"
        >
          <option value="all">all</option>
          <option value="completed">completed</option>
          <option value="active">active</option>
        </select>
      </div>

      <div className="control has-icons-right" style={{ flex: 1 }}>
        <input
          className="input"
          placeholder="filter by title..."
          value={query}
          onChange={e => onQueryChange(e.target.value)}
          data-cy="searchInput"
        />
        {query && (
          <span
            role="button"
            className="icon is-right has-text-grey"
            onClick={onClearQuery}
            data-cy="clearSearchButton"
            title="Clear"
            style={{ pointerEvents: 'auto', cursor: 'pointer' }}
          >
            <i className="fas fa-times" />
          </span>
        )}
      </div>
    </form>
  );
};
