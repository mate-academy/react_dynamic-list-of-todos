import React from 'react';
import { SelectFilter } from '../../types/SelectFilter';
import { handleTodoStatusChange } from '../../utils/helper';

type Props = {
  query: string,
  setQuery: (query: string) => void,
  reset: () => void,
  selectFilter: SelectFilter,
  setSelectFilter: (selectFilter: SelectFilter) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  setQuery,
  reset,
  selectFilter,
  setSelectFilter,
}) => {
  //  const handleTodoStatusCahnge = (
  //   event: React.ChangeEvent<HTMLSelectElement>,
  // ) => {
  //   switch (event.target.value) {
  //     case SelectFilter.ACTIVE:
  //       setSelectFilter(SelectFilter.ACTIVE);
  //       break;
  //     case SelectFilter.COMPLETED:
  //       setSelectFilter(SelectFilter.COMPLETED);
  //       break;
  //     case SelectFilter.ALL:
  //     default:
  //       setSelectFilter(SelectFilter.ALL);
  //   }
  // };

  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            value={selectFilter}
            onChange={handleTodoStatusChange(setSelectFilter)}
          >
            <option value={SelectFilter.ALL}>All</option>
            <option value={SelectFilter.ACTIVE}>Active</option>
            <option value={SelectFilter.COMPLETED}>Completed</option>
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

        {query && (
          <span className="icon is-right" style={{ pointerEvents: 'all' }}>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              data-cy="clearSearchButton"
              type="button"
              className="delete"
              onClick={reset}
            />
          </span>
        )}
      </p>
    </form>
  );
};
