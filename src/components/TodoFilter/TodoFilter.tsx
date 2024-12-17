import React from 'react';

enum FilterType {
  all = 'all',
  active = 'active',
  completed = 'completed',
}

type Props = {
  query: string;
  setQuery: (query: string) => void;
  completedFilter: FilterType | null;
  setCompletedFilter: (filter: FilterType | null) => void;
};

export const TodoFilter: React.FC<Props> = (props: Props) => {
  const { query, setQuery, completedFilter, setCompletedFilter } = props;

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={completedFilter ?? FilterType.all}
            onChange={e => {
              const selectedValue = e.target.value as FilterType;

              setCompletedFilter(selectedValue);
            }}
          >
            <option value={FilterType.all}>All</option>
            <option value={FilterType.active}>Active</option>
            <option value={FilterType.completed}>Completed</option>
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
            setQuery(event.target.value);
          }}
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
              onClick={() => {
                setCompletedFilter(FilterType.all);
                setQuery('');
              }}
            />
          )}
        </span>
      </p>
    </form>
  );
};
