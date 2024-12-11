import React from 'react';
import { CompletedFilter } from '../../types/CompletedFilter';
import { getNameInCapitalizedCase } from '../../utils/getNameInCapitalizedCase';

interface Props {
  completedFilter: CompletedFilter;
  setCompletedFilter: React.Dispatch<React.SetStateAction<CompletedFilter>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const TodoFilter: React.FC<Props> = ({
  completedFilter,
  setCompletedFilter,
  searchQuery,
  setSearchQuery,
}) => {
  const handleSelectCompletedFilter = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => setCompletedFilter(event.target.value as CompletedFilter);
  const completedFilterOptions = [
    CompletedFilter.All,
    CompletedFilter.Active,
    CompletedFilter.Completed,
  ];

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={completedFilter}
            onChange={handleSelectCompletedFilter}
          >
            {completedFilterOptions.map(option => (
              <option key={option} value={option}>
                {getNameInCapitalizedCase(option)}
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
          value={searchQuery}
          onChange={event => setSearchQuery(event.target.value.trimStart())}
        />

        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {!!searchQuery.length && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={() => setSearchQuery('')}
            />
          </span>
        )}
      </p>
    </form>
  );
};
