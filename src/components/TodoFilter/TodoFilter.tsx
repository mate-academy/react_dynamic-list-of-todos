import React from 'react';

type Props = {
  filterQuery: string,
  onFilterQueryChange: React.Dispatch<React.SetStateAction<string>>,
  onDebounceAppliedQuery: React.Dispatch<React.SetStateAction<string>>,
  filterOption: string,
  onFilterOptionChange: React.Dispatch<React.SetStateAction<string>>
};

export const TodoFilter: React.FC<Props> = React.memo(({
  filterQuery,
  onFilterQueryChange,
  onDebounceAppliedQuery,
  filterOption,
  onFilterOptionChange,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={filterOption}
            onChange={e => onFilterOptionChange(e.target.value)}
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
          value={filterQuery}
          onChange={(e) => {
            onFilterQueryChange(e.target.value);
            onDebounceAppliedQuery(e.target.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {filterQuery && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                onFilterQueryChange('');
                onDebounceAppliedQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
});
