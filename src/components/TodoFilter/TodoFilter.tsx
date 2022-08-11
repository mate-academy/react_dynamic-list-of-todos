import React, { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

type Props = {
  selectFilter: string;
  searchFilter: string;
  onSelectFilter: React.Dispatch<React.SetStateAction<string>>;
  onSearchFilter: React.Dispatch<React.SetStateAction<string>>;
};

export const TodoFilter: React.FC<Props> = React.memo(({
  selectFilter,
  searchFilter,
  onSelectFilter,
  onSearchFilter,
}) => {
  const [filter, setFilter] = useState(searchFilter);
  const applyQuery = useCallback(debounce(onSearchFilter, 500), []);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectFilter}
            onChange={(event) => {
              onSelectFilter(event.target.value);
            }}
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
          value={filter}
          onChange={(event) => {
            setFilter(event.currentTarget.value);
            applyQuery(event.currentTarget.value);
          }}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {searchFilter && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => {
                setFilter('');
                applyQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
});
