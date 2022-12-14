import React, { useCallback } from 'react';
import { Filter } from '../../types/Filter';

type Props = {
  getQuery: (query: string) => void,
  getOption: (option: string) => void,
  queryToFilter: string,
  selectedStatus: Filter
};

export const TodoFilter: React.FC<Props> = React.memo((
  {
    getQuery,
    getOption,
    queryToFilter,
    selectedStatus,
  },
) => {
  const fillOption = useCallback((
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { value } = event.target;

    getOption(value);
  }, []);

  const fillQuery = useCallback((
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { value } = event.target;

    getQuery(value);
  }, []);

  const clearQuery = useCallback(() => {
    getQuery('');
  }, []);

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectedStatus}
            onChange={fillOption}
          >
            <option value={Filter.ALL}>All</option>
            <option value={Filter.ACTIVE}>Active</option>
            <option value={Filter.COMPLETED}>Completed</option>
          </select>
        </span>
      </p>

      <p className="control is-expanded has-icons-left has-icons-right">
        <input
          data-cy="searchInput"
          type="text"
          className="input"
          placeholder="Search..."
          value={queryToFilter}
          onChange={fillQuery}
        />
        <span className="icon is-left">
          <i className="fas fa-magnifying-glass" />
        </span>

        {queryToFilter && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={clearQuery}
            />
          </span>
        )}
      </p>
    </form>
  );
});
