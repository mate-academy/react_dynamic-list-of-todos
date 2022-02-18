import React from 'react';

type Props = {
  query: string;
  filterOption: string;
  onQueryChange: (value: string) => void;
  onFilterChange: (value: FilterOption) => void;
  onShuffle: () => void;
};

export const ListFilter: React.FC<Props> = ({
  query,
  filterOption,
  onQueryChange,
  onFilterChange,
  onShuffle,
}) => {
  return (
    <div className="TodoList__filter">
      <input
        type="text"
        id="query"
        value={query}
        onChange={(e) => onQueryChange(e.currentTarget.value)}
      />

      <select
        value={filterOption}
        onChange={(e) => {
          onFilterChange(e.currentTarget.value as FilterOption);
        }}
      >
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <button
        type="button"
        onClick={() => onShuffle()}
      >
        Shuffle todos
      </button>
    </div>
  );
};
