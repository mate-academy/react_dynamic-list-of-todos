import React from 'react';
import { SortType } from '../../types/SortType';

type Props = {
  query: string,
  onChangeQuery: (input: string) => void,
  onChangeSortType: (newSortType: string) => void,
};

export const TodoFilter: React.FC<Props> = ({
  query,
  onChangeQuery,
  onChangeSortType,
}) => {
  return (
    <form className="field has-addons">
      <p className="control">
        <span className="select">
          <select
            data-cy="statusSelect"
            onChange={(event) => {
              onChangeSortType(event.target.value);
            }}
          >
            <option value={SortType.ALL}>All</option>
            <option value={SortType.ACTIVE}>Active</option>
            <option value={SortType.COMPLETED}>Completed</option>
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
          onChange={(event) => {
            onChangeQuery(event.target.value);
          }}
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
              onClick={() => {
                onChangeQuery('');
              }}
            />
          </span>
        )}
      </p>
    </form>
  );
};
