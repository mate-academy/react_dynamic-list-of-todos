import React from 'react';

type FilterStatus = 'all' | 'completed' | 'active';

type Props = {
  query: string;
  onQueryChange: (value: string) => void;
  onClearQuery: () => void;
  filterStatus: FilterStatus;
  onFilterChange: (status: FilterStatus) => void;
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onQueryChange,
  onClearQuery,
  filterStatus,
  onFilterChange,
}) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value as FilterStatus);
  };

  return (
    <div className="field is-grouped is-grouped-multiline">
      <div className="control">
        <div className="field has-addons">
          <div className="control">
            <input
              className="input"
              type="text"
              placeholder="Filter by title"
              value={query}
              onChange={e => onQueryChange(e.target.value)}
            />
          </div>
          {query && (
            <div className="control">
              <button className="button is-light" onClick={onClearQuery}>
                x
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="control">
        <div className="select">
          <select value={filterStatus} onChange={handleFilterChange}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="active">Active</option>
          </select>
        </div>
      </div>
    </div>
  );
};
